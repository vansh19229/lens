import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiArrowLeft, FiTag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  const shipping = subtotal >= 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Looks like you haven't added anything yet. Explore our collection!</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <FiShoppingBag className="w-4 h-4" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-4">
            <FiArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Shopping Cart
            <span className="ml-3 text-xl font-normal text-slate-500 dark:text-slate-400">({items.length} items)</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex gap-5"
                >
                  {/* Image */}
                  <Link to={`/products/${item.product?._id}`} className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {item.product?.images?.[0] ? (
                      <img src={item.product.images[0]} alt={item.product?.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">👓</span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{item.product?.brand}</p>
                        <Link to={`/products/${item.product?._id}`} className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1 mt-0.5">
                          {item.product?.name}
                        </Link>
                        {item.selectedColor && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Color: {item.selectedColor}</p>
                        )}
                        {item.lensCustomization && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            {item.lensCustomization.lensType} · {item.lensCustomization.material}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 flex-shrink-0"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-40 transition-colors"
                        >
                          <FiMinus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                        </button>
                        <span className="w-10 text-center font-semibold text-slate-900 dark:text-white text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                          <FiPlus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-slate-400">₹{item.price.toLocaleString()} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sticky top-24">
              <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-5">Order Summary</h2>

              {/* Promo Banner */}
              {shipping > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3 mb-5">
                  <div className="flex items-center gap-2">
                    <FiTag className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Add <strong>₹{(999 - subtotal).toLocaleString()}</strong> more for free shipping!
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-5">
                {[
                  { label: 'Subtotal', value: `₹${subtotal.toLocaleString()}` },
                  { label: 'Shipping', value: shipping === 0 ? 'Free' : `₹${shipping}`, green: shipping === 0 },
                  { label: 'GST (18%)', value: `₹${gst.toLocaleString()}` },
                ].map(({ label, value, green }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                    <span className={green ? 'font-semibold text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}>{value}</span>
                  </div>
                ))}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-bold text-xl text-slate-900 dark:text-white">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Proceed to Checkout
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
