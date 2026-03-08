import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import StarRating from './StarRating';
import Badge from './Badge';
import { formatPrice, getDiscountPercent } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const discount = getDiscountPercent(product.price, product.originalPrice);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/products/${product._id}`} className="block">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="glass-card overflow-hidden"
          style={{ boxShadow: isHovered ? '0 24px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.1)' : '0 4px 20px rgba(0,0,0,0.3)' }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white/05 to-white/02 h-52">
            {!imageError && product.images?.[0] ? (
              <motion.img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl select-none">
                {product.category === 'sunglasses' ? '🕶️' : '👓'}
              </div>
            )}

            {/* Top gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && <Badge type={product.badge} />}
              {discount > 0 && (
                <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-red-500/90 text-white backdrop-blur-sm">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
              className="absolute top-3 right-3 p-2 rounded-full glass-dark shadow-lg"
            >
              {isWishlisted ? (
                <FaHeart className="text-red-400" size={15} />
              ) : (
                <FiHeart className="text-white/70" size={15} />
              )}
            </motion.button>

            {/* Add to cart overlay */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 bottom-0 pb-4 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-colors duration-200"
              >
                <FiShoppingCart size={13} />
                Add to Cart
              </motion.button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4 border-t border-white/05">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">{product.brand}</p>
            <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 min-h-[2.5rem] leading-snug">
              {product.name}
            </h3>
            <StarRating rating={product.rating || 0} showCount count={product.numReviews || 0} />
            <div className="flex items-center gap-2 mt-2.5">
              <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2.5">
                {product.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    title={color}
                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: color.toLowerCase() === 'gold' ? '#ffd700' : color.toLowerCase() === 'tortoise' ? '#8B4513' : color.toLowerCase() }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-white/30">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

