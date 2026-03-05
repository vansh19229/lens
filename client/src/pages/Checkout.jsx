import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import api from '../utils/api';
import toast from 'react-hot-toast';

const STEPS = ['Shipping', 'Order Summary', 'Payment'];

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: '', phone: '', street: '', city: '', state: '', pincode: '',
  });

  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      // Create Razorpay order
      const orderRes = await api.post('/payments/create-order', { amount: total });
      const razorpayOrder = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: razorpayOrder.amount,
        currency: 'INR',
        name: 'Lens Master',
        description: 'Eyewear Purchase',
        order_id: razorpayOrder.id,
        prefill: { name: address.name, contact: address.phone },
        theme: { color: '#2563eb' },
        handler: async (response) => {
          try {
            // Verify payment
            await api.post('/payments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            // Create order
            const order = await api.post('/orders', {
              shippingAddress: address,
              paymentMethod: 'razorpay',
              paymentResult: {
                id: response.razorpay_payment_id,
                status: 'paid',
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
              },
            });
            await clearCart();
            toast.success('Order placed successfully! 🎉');
            navigate(`/orders/${order.data._id}`);
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback: create order directly (demo mode)
        const order = await api.post('/orders', {
          shippingAddress: address,
          paymentMethod: 'cod',
          paymentResult: { id: 'demo', status: 'pending' },
        });
        await clearCart();
        toast.success('Order placed! (Demo mode)');
        navigate(`/orders/${order.data._id || order.data.order?._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      {/* Step Indicators */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center gap-2 ${i <= step ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < step ? 'bg-blue-600 border-blue-600 text-white' : i === step ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-400'
              }`}>
                {i < step ? <FiCheck size={14} /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Shipping Address</h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input required value={address.name} onChange={e => setAddress(p => ({...p, name: e.target.value}))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input required value={address.phone} onChange={e => setAddress(p => ({...p, phone: e.target.value}))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                    <input required value={address.street} onChange={e => setAddress(p => ({...p, street: e.target.value}))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Apartment, Street, Area" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input required value={address.city} onChange={e => setAddress(p => ({...p, city: e.target.value}))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mumbai" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input required value={address.state} onChange={e => setAddress(p => ({...p, state: e.target.value}))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Maharashtra" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                      <input required value={address.pincode} onChange={e => setAddress(p => ({...p, pincode: e.target.value}))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="400001" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-2">
                    Continue to Order Summary →
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 2: Summary */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => {
                    const product = item.product || {};
                    const price = item.price || product.price || 0;
                    return (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 flex-shrink-0">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-1" />
                          ) : (
                            <span className="text-2xl">{product.category === 'sunglasses' ? '🕶️' : '👓'}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold">{formatPrice(price * item.quantity)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Shipping to:</p>
                  <p className="text-sm text-gray-600">{address.name}, {address.phone}</p>
                  <p className="text-sm text-gray-600">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                    ← Edit Address
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    Continue to Payment →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Secure Payment</h2>
                <p className="text-sm text-gray-500 mb-6">Your payment is secured by Razorpay</p>
                <div className="border-2 border-blue-200 rounded-xl p-4 mb-6 bg-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">💳</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Razorpay</p>
                      <p className="text-xs text-gray-500">UPI, Cards, Net Banking, Wallets</p>
                    </div>
                    <div className="ml-auto w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <FiCheck size={12} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                    ← Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                    disabled={processing}
                    className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                    ) : (
                      `Pay ${formatPrice(total)} →`
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Price Summary Sidebar */}
        <div>
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Price Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t">
                <span>Total</span><span className="text-blue-600">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-xl text-xs text-green-700 font-medium text-center">
              🎉 You're saving {formatPrice(items.reduce((a, i) => a + ((i.product?.originalPrice || i.product?.price || 0) - (i.product?.price || 0)) * i.quantity, 0))} on this order!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
