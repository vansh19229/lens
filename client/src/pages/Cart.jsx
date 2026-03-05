import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import Breadcrumb from '../components/ui/Breadcrumb';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🛍️</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Add some amazing eyewear to get started</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          <FiShoppingBag size={18} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = item.product || {};
            const price = item.price || product.price || 0;
            return (
              <motion.div
                key={item._id}
                layout
                className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
              >
                <div className="w-24 h-24 rounded-xl bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 flex items-center justify-center">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-4xl">{product.category === 'sunglasses' ? '🕶️' : '👓'}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-600 font-medium">{product.brand}</p>
                  <p className="font-semibold text-gray-900 text-sm mt-0.5">{product.name}</p>
                  {item.lensCustomization && (
                    <p className="text-xs text-purple-600 mt-1 bg-purple-50 px-2 py-0.5 rounded-full inline-block">
                      + {item.lensCustomization.lensType} lenses
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1.5 hover:bg-gray-50 transition-colors rounded-l-lg">
                        <FiMinus size={14} />
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1.5 hover:bg-gray-50 transition-colors rounded-r-lg">
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">{formatPrice(price * item.quantity)}</span>
                      <button onClick={() => removeFromCart(item._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <Link to="/products" className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline mt-2">
            <FiArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                  Add {formatPrice(999 - subtotal)} more for free delivery
                </p>
              )}
              <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-100">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full py-4 mt-5 bg-blue-600 text-white text-center font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout →
            </Link>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>🔒 Secure Checkout</span>
              <span>💳 Multiple Payment Methods</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
