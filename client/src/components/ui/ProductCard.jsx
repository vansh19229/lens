import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const BADGE_STYLES = {
  New: 'bg-emerald-500 text-white',
  Trending: 'bg-orange-500 text-white',
  Sale: 'bg-red-500 text-white',
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(false);
  const [adding, setAdding] = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product, 1);
    setTimeout(() => setAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(!wishlist);
  };

  const categoryEmoji = {
    eyeglasses: '👓',
    sunglasses: '🕶️',
    'contact-lenses': '💧',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/products/${product._id}`} className="group block">
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-square bg-slate-50 dark:bg-slate-800 overflow-hidden">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl opacity-40">
                  {categoryEmoji[product.category] || '👓'}
                </span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && BADGE_STYLES[product.badge] && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold ${BADGE_STYLES[product.badge]}`}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-red-500 text-white">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              <FiHeart
                className={`w-3.5 h-3.5 transition-colors ${wishlist ? 'fill-red-500 text-red-500' : 'text-slate-500 dark:text-slate-400'}`}
              />
            </button>

            {/* Add to cart overlay */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-3 left-3 right-3 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
            >
              {adding ? (
                <>
                  <div className="w-3 h-3 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Added!
                </>
              ) : (
                <>
                  <FiShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </>
              )}
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            {product.avgRating > 0 && (
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`w-3 h-3 ${star <= Math.round(product.avgRating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  ({product.numReviews || 0})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-slate-900 dark:text-white">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Color swatches */}
              {product.colors?.length > 0 && (
                <div className="flex items-center gap-1">
                  {product.colors.slice(0, 4).map((color, i) => (
                    <div
                      key={i}
                      title={color}
                      className="w-3 h-3 rounded-full ring-1 ring-slate-200 dark:ring-slate-700"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-slate-400">+{product.colors.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
