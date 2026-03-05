import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import StarRating from './StarRating';
import Badge from './Badge';
import { formatPrice, getDiscountPercent } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  const discount = getDiscountPercent(product.price, product.originalPrice);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/products/${product._id}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 card-hover">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gray-50 h-52">
            {!imageError && product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl select-none">
                {product.category === 'sunglasses' ? '🕶️' : '👓'}
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.badge && <Badge type={product.badge} />}
              {discount > 0 && (
                <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500" size={16} />
              ) : (
                <FiHeart className="text-gray-400" size={16} />
              )}
            </button>

            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <FiShoppingCart size={14} />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">{product.brand}</p>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            <StarRating rating={product.rating || 0} showCount count={product.numReviews || 0} />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                {product.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    title={color}
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color.toLowerCase() === 'gold' ? '#ffd700' : color.toLowerCase() === 'tortoise' ? '#8B4513' : color.toLowerCase() }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-gray-400">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
