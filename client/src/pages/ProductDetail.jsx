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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-96" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="h-12 bg-gray-200 rounded-xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
        <Link to="/products" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">
          Browse Products
        </Link>
      </div>
    );
  }

  const discount = getDiscountPercent(product.price, product.originalPrice);
  const images = product.images?.length > 0 ? product.images : [null];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: product.brand, href: `/products?brand=${product.brand}` },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-3 aspect-square flex items-center justify-center">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <div className="text-9xl">{product.category === 'sunglasses' ? '🕶️' : '👓'}</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 flex items-center justify-center bg-white ${
                    activeImage === i ? 'border-blue-500' : 'border-gray-200'
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
          {product.badge && <Badge type={product.badge} className="mb-3" />}
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating || 0} size="md" showCount count={product.numReviews || 0} />
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-extrabold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-full">{discount}% off</span>
              </>
            )}
          </div>

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">Color: <span className="font-normal capitalize">{selectedColor}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-8 h-8 rounded-full border-4 transition-all ${selectedColor === color ? 'border-blue-500 scale-110' : 'border-gray-200 hover:border-gray-400'}`}
                    style={{ backgroundColor: color.toLowerCase() === 'gold' ? '#ffd700' : color.toLowerCase() === 'tortoise' ? '#8B4513' : color.toLowerCase() === 'transparent' ? 'transparent' : color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 hover:bg-gray-50 font-bold text-gray-700 transition-colors">−</button>
              <span className="px-4 py-2.5 font-semibold min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 hover:bg-gray-50 font-bold text-gray-700 transition-colors">+</button>
            </div>
            <span className="text-sm text-gray-500">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAddToCart()}
              disabled={addingToCart || product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiShoppingCart size={18} /> Add to Cart
                </>
              )}
            </motion.button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-3.5 border-2 border-gray-200 rounded-xl hover:border-red-300 transition-colors"
            >
              {isWishlisted ? <FaHeart className="text-red-500" size={18} /> : <FiHeart size={18} />}
            </button>
            <button className="p-3.5 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <FiShare2 size={18} />
            </button>
          </div>

          {/* Lens Customizer */}
          {product.category === 'eyeglasses' && (
            <button
              onClick={() => setShowCustomizer(true)}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity mb-5"
            >
              🔬 Customize Lenses — Personalize your prescription
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
              <div key={b.text} className="flex items-center gap-2 text-xs text-gray-600">
                <span>{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                activeTab === i ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 0 && (
            <p className="text-gray-600 leading-relaxed">{product.description || 'Premium quality eyewear crafted with precision and style. Features durable frame construction and high-quality lenses for optimal vision clarity.'}</p>
          )}
          {activeTab === 1 && (
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Category', product.category?.replace('-', ' ')],
                ['Frame Type', product.frameType || '—'],
                ['Frame Shape', product.frameShape || '—'],
                ['Gender', product.gender || '—'],
                ['Brand', product.brand],
                ['Stock', `${product.stock} units`],
              ].map(([label, value]) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-900 capitalize">{value}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 2 && (
            <div className="space-y-6">
              {isAuthenticated && (
                <form onSubmit={handleSubmitReview} className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Write a Review</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600">Rating:</span>
                    {[1,2,3,4,5].map(r => (
                      <button key={r} type="button" onClick={() => setNewReview(p => ({...p, rating: r}))}
                        className={`text-xl ${r <= newReview.rating ? 'text-amber-400' : 'text-gray-300'}`}>★</button>
                    ))}
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={e => setNewReview(p => ({...p, comment: e.target.value}))}
                    placeholder="Share your experience..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                  <button type="submit" disabled={submittingReview}
                    className="mt-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
              {reviews.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map((r) => (
                  <div key={r._id} className="border-b border-gray-100 pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm flex-shrink-0">
                        {r.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">{r.user?.name || 'Customer'}</p>
                          <StarRating rating={r.rating} />
                        </div>
                        <p className="text-sm text-gray-600">{r.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
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
  );
};

export default ProductDetail;
