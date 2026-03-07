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
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={toggleDrawer}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm z-50 shadow-[-20px_0_60px_rgba(0,0,0,0.6)] flex flex-col"
            style={{ background: 'rgba(14,14,14,0.95)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/06">
              <div className="flex items-center gap-2.5">
                <FiShoppingBag size={19} className="text-blue-400" />
                <h2 className="text-base font-semibold text-white">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1 shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={toggleDrawer}
                className="p-2 rounded-xl hover:bg-white/05 text-white/40 hover:text-white transition-all duration-200">
                <FiX size={19} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-base font-semibold text-white mb-2">Your cart is empty</h3>
                  <p className="text-sm text-white/35 mb-6">Discover our amazing eyewear collection</p>
                  <Link
                    to="/products"
                    onClick={toggleDrawer}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl btn-glow transition-all duration-300"
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
                      className="flex gap-3 glass-card p-3"
                    >
                      <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden bg-white/05 border border-white/05">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            {product.category === 'sunglasses' ? '🕶️' : '👓'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-blue-400 font-medium">{product.brand}</p>
                        <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                        {item.lensCustomization && (
                          <p className="text-xs text-violet-400 mt-0.5">
                            + {item.lensCustomization.lensType}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-0.5 glass-dark rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="p-1.5 hover:bg-white/05 transition-colors text-white/50 hover:text-white"
                            >
                              <FiMinus size={11} />
                            </button>
                            <span className="px-2.5 text-sm font-medium text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="p-1.5 hover:bg-white/05 transition-colors text-white/50 hover:text-white"
                            >
                              <FiPlus size={11} />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-white">
                            {formatPrice(price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-1.5 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 self-start"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/06 px-5 py-4 space-y-3.5">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/40">
                    <span>Subtotal</span>
                    <span className="text-white/60">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Delivery</span>
                    <span>{shipping === 0 ? <span className="text-emerald-400 font-medium">Free</span> : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>GST (18%)</span>
                    <span className="text-white/60">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white text-base pt-2.5 border-t border-white/06">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                {subtotal < 999 && (
                  <p className="text-xs text-center text-blue-400 glass-card rounded-xl py-2.5 px-3 border border-blue-500/15">
                    Add {formatPrice(999 - subtotal)} more for free delivery!
                  </p>
                )}
                <Link
                  to="/checkout"
                  onClick={toggleDrawer}
                  className="block w-full py-3.5 bg-blue-600 text-white text-center font-semibold rounded-xl btn-glow transition-all duration-300 text-sm"
                >
                  Proceed to Checkout →
                </Link>
                <button
                  onClick={toggleDrawer}
                  className="block w-full py-2 text-sm text-white/30 text-center hover:text-white/60 transition-colors duration-200"
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

