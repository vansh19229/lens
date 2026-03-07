import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiShare2, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import StarRating from '../components/ui/StarRating';
import Breadcrumb from '../components/ui/Breadcrumb';
import Badge from '../components/ui/Badge';
import LensCustomizer from '../components/lens/LensCustomizer';
import api from '../utils/api';
import { formatPrice, getDiscountPercent } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const TABS = ['Description', 'Details', 'Reviews'];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product || res.data);
        setSelectedColor(res.data.product?.colors?.[0] || res.data?.colors?.[0] || null);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (activeTab === 2) {
      api.get(`/reviews/product/${id}`)
        .then(res => setReviews(res.data.reviews || []))
        .catch(() => {});
    }
  }, [activeTab, id]);

  const handleAddToCart = async (lensCustomization = null) => {
    setAddingToCart(true);
    await addToCart(product, qty, lensCustomization);
    setAddingToCart(false);
  };

  const handleCustomizerAdd = (customization) => {
    handleAddToCart(customization);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login to review'); return; }
    setSubmittingReview(true);
    try {
      await api.post('/reviews', { productId: id, ...newReview });
      toast.success('Review submitted!');
      setNewReview({ rating: 5, comment: '' });
      const res = await api.get(`/reviews/product/${id}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
            <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl h-96" />
            <div className="space-y-4">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/4" />
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-full w-1/3" />
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Product not found</h2>
          <Link to="/products" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = getDiscountPercent(product.price, product.originalPrice);
  const images = product.images?.length > 0 ? product.images : [null];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.brand, href: `/products?brand=${product.brand}` },
            { label: product.name },
          ]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm mb-4 aspect-square flex items-center justify-center">
              {images[activeImage] ? (
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-all duration-300"
                />
              ) : (
                <div className="text-9xl opacity-30">{product.category === 'sunglasses' ? '🕶️' : '👓'}</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 flex items-center justify-center bg-white dark:bg-slate-800 transition-all ${
                      activeImage === i ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {img ? <img src={img} alt="" className="w-full h-full object-contain p-1" /> : <span className="text-xl">👓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.badge && <Badge label={product.badge} className="mb-4" />}
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating || product.avgRating || 0} size="md" showCount count={product.numReviews || 0} />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold px-2.5 py-0.5 rounded-xl">{discount}% off</span>
                </>
              )}
            </div>

            {/* Color Selector */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
                  Color: <span className="font-normal capitalize text-slate-500 dark:text-slate-400">{selectedColor}</span>
                </p>
                <div className="flex gap-2.5 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`w-9 h-9 rounded-full border-[3px] transition-all duration-200 ${
                        selectedColor === color ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/30' : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() === 'gold' ? '#ffd700' : color.toLowerCase() === 'tortoise' ? '#8B4513' : color.toLowerCase() === 'transparent' ? 'rgba(255,255,255,0.1)' : color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  −
                </button>
                <span className="px-5 py-3 font-semibold text-slate-900 dark:text-white min-w-[3rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  +
                </button>
              </div>
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAddToCart()}
                disabled={addingToCart || product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </motion.button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${isWishlisted ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-500' : 'border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-700 text-slate-500 dark:text-slate-400'}`}
              >
                {isWishlisted ? <FaHeart className="w-5 h-5" /> : <FiHeart className="w-5 h-5" />}
              </button>
              <button className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-500 dark:text-slate-400 transition-all duration-200">
                <FiShare2 className="w-5 h-5" />
              </button>
            </div>

            {/* Lens Customizer */}
            {product.category === 'eyeglasses' && (
              <button
                onClick={() => setShowCustomizer(true)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 mb-5"
              >
                🔬 Customize Lenses — Add prescription & coatings
              </button>
            )}

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🚚', text: 'Free delivery above ₹999' },
                { icon: '↩️', text: '30 day easy returns' },
                { icon: '✅', text: 'Authentic products' },
                { icon: '🔒', text: 'Secure payment' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
                  <span>{b.icon}</span>
                  <span className="font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                  activeTab === i
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {tab}
                {activeTab === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 0 && (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.description || 'Premium quality eyewear crafted with precision and style. Features durable frame construction and high-quality lenses for optimal vision clarity.'}
              </p>
            )}
            {activeTab === 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ['Category', product.category?.replace('-', ' ')],
                  ['Frame Type', product.frameType || '—'],
                  ['Frame Shape', product.frameShape || '—'],
                  ['Gender', product.gender || '—'],
                  ['Brand', product.brand],
                  ['Stock', `${product.stock} units`],
                ].map(([label, value]) => (
                  <div key={label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">{value}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-6">
                {isAuthenticated && (
                  <form onSubmit={handleSubmitReview} className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/50">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Write a Review</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Rating:</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(r => (
                          <button key={r} type="button" onClick={() => setNewReview(p => ({...p, rating: r}))}
                            className={`text-2xl transition-transform hover:scale-110 ${r <= newReview.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}>
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={newReview.comment}
                      onChange={e => setNewReview(p => ({...p, comment: e.target.value}))}
                      placeholder="Share your experience with this product..."
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none placeholder-slate-400"
                      required
                    />
                    <button type="submit" disabled={submittingReview}
                      className="mt-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50">
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                )}
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">⭐</div>
                    <p className="text-slate-400 dark:text-slate-500">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  reviews.map((r) => (
                    <div key={r._id} className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                        {r.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.user?.name || 'Customer'}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{new Date(r.createdAt).toLocaleDateString('en-IN')}</p>
                        </div>
                        <StarRating rating={r.rating} size="sm" showCount={false} />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{r.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <LensCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          framePrice={product.price}
          onAddToCart={handleCustomizerAdd}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
