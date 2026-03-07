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

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Checkout</h1>

        {/* Step Indicators */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  i < step
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : i === step
                    ? 'bg-white dark:bg-slate-800 border-2 border-blue-600 text-blue-600'
                    : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400'
                }`}>
                  {i < step ? <FiCheck className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i <= step ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 rounded-full ${i < step ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Shipping Address</h2>
                  <form onSubmit={handleAddressSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input required value={address.name} onChange={e => setAddress(p => ({...p, name: e.target.value}))}
                          className={inputClass} placeholder="John Doe" />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input required value={address.phone} onChange={e => setAddress(p => ({...p, phone: e.target.value}))}
                          className={inputClass} placeholder="+91 9876543210" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Street Address *</label>
                      <input required value={address.street} onChange={e => setAddress(p => ({...p, street: e.target.value}))}
                        className={inputClass} placeholder="Apartment, Street, Area" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>City *</label>
                        <input required value={address.city} onChange={e => setAddress(p => ({...p, city: e.target.value}))}
                          className={inputClass} placeholder="Mumbai" />
                      </div>
                      <div>
                        <label className={labelClass}>State *</label>
                        <input required value={address.state} onChange={e => setAddress(p => ({...p, state: e.target.value}))}
                          className={inputClass} placeholder="Maharashtra" />
                      </div>
                      <div>
                        <label className={labelClass}>PIN Code *</label>
                        <input required value={address.pincode} onChange={e => setAddress(p => ({...p, pincode: e.target.value}))}
                          className={inputClass} placeholder="400001" />
                      </div>
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 mt-2">
                      Continue to Order Summary →
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2: Summary */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    {items.map(item => {
                      const product = item.product || {};
                      const price = item.price || product.price || 0;
                      return (
                        <div key={item._id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                          <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 flex-shrink-0">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              <span className="text-2xl">{product.category === 'sunglasses' ? '🕶️' : '👓'}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{product.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">{formatPrice(price * item.quantity)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-5 border border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Shipping to:</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{address.name} · {address.phone}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="flex-1 py-3.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      ← Edit Address
                    </button>
                    <button onClick={() => setStep(2)} className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300">
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Secure Payment</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your payment is secured by Razorpay</p>
                  <div className="border-2 border-blue-200 dark:border-blue-800/50 rounded-2xl p-5 mb-6 bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <span className="text-white text-xl">💳</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Razorpay</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">UPI · Cards · Net Banking · Wallets</p>
                      </div>
                      <div className="ml-auto w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <FiCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      ← Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      disabled={processing}
                      className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 dark:text-white mb-5">Price Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Subtotal', value: formatPrice(subtotal) },
                  { label: 'Delivery', value: shipping === 0 ? 'Free' : formatPrice(shipping), green: shipping === 0 },
                  { label: 'GST (18%)', value: formatPrice(tax) },
                ].map(({ label, value, green }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                    <span className={green ? 'font-semibold text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-slate-900 dark:text-white text-base pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-5 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 font-medium text-center border border-emerald-200 dark:border-emerald-800/50">
                🎉 Secure checkout powered by Razorpay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
