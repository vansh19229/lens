import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';

const CartDrawer = () => {
  const { items, isOpen, toggleDrawer, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={toggleDrawer}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FiShoppingBag size={20} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={toggleDrawer} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FiX size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-400 mb-6">Discover our amazing eyewear collection</p>
                  <Link
                    to="/products"
                    onClick={toggleDrawer}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const product = item.product || {};
                  const price = item.price || product.price || 0;
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-gray-50 rounded-xl p-3"
                    >
                      <div className="w-16 h-16 rounded-lg bg-white flex-shrink-0 overflow-hidden border border-gray-100">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            {product.category === 'sunglasses' ? '🕶️' : '👓'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-blue-600 font-medium">{product.brand}</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                        {item.lensCustomization && (
                          <p className="text-xs text-purple-600 mt-0.5">
                            + {item.lensCustomization.lensType}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 border border-gray-200 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="px-2 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            {formatPrice(price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (18%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                {subtotal < 999 && (
                  <p className="text-xs text-center text-blue-600 bg-blue-50 rounded-lg py-2 px-3">
                    Add {formatPrice(999 - subtotal)} more for free delivery!
                  </p>
                )}
                <Link
                  to="/checkout"
                  onClick={toggleDrawer}
                  className="block w-full py-3.5 bg-blue-600 text-white text-center font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout →
                </Link>
                <button
                  onClick={toggleDrawer}
                  className="block w-full py-2.5 text-sm text-gray-600 text-center hover:text-gray-900 transition-colors"
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
};

export default CartDrawer;
