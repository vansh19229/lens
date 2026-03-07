import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, toggleDrawer, updateQuantity, removeItem, subtotal } = useCart();

  const shipping = subtotal >= 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleDrawer}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <FiShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white text-lg">Shopping Cart</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-4">
                    <FiShoppingBag className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Your cart is empty</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Discover our premium eyewear collection</p>
                  <button
                    onClick={toggleDrawer}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item._id + JSON.stringify(item.lensCustomization)}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl"
                  >
                    {/* Image */}
                    <div className="w-18 h-18 bg-white dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm">
                      {item.images?.[0] ? (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">👓</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">{item.brand}</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 mt-0.5">{item.name}</p>
                      {item.selectedColor && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Color: {item.selectedColor}</p>
                      )}
                      {item.lensCustomization && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                          {item.lensCustomization.lensType} · {item.lensCustomization.material}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-slate-900 dark:text-white">₹{item.price.toLocaleString()}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item._id, item.lensCustomization, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 flex items-center justify-center transition-colors"
                          >
                            <FiMinus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.lensCustomization, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 flex items-center justify-center transition-colors"
                          >
                            <FiPlus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                          </button>
                          <button
                            onClick={() => removeItem(item._id, item.lensCustomization)}
                            className="w-7 h-7 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center ml-1 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                {/* Free shipping banner */}
                {shipping > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl px-4 py-2.5">
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Add <strong>₹{(999 - subtotal).toLocaleString()}</strong> more for free shipping!
                    </p>
                  </div>
                )}

                {/* Price breakdown */}
                <div className="space-y-2">
                  {[
                    { label: 'Subtotal', value: `₹${subtotal.toLocaleString()}` },
                    { label: 'Shipping', value: shipping === 0 ? <span className="text-green-600 dark:text-green-400 font-medium">Free</span> : `₹${shipping}` },
                    { label: 'GST (18%)', value: `₹${gst.toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">{label}</span>
                      <span className="text-slate-700 dark:text-slate-300">{value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white">Total</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={toggleDrawer}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={toggleDrawer}
                  className="w-full py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
