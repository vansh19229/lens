import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiStar, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ui/ProductCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import StarRating from '../components/ui/StarRating';
import api from '../utils/api';

const CATEGORIES = [
  { id: 'eyeglasses', label: 'Eyeglasses', emoji: '👓', desc: 'Prescription & fashion frames', color: 'from-blue-500 to-blue-600' },
  { id: 'sunglasses', label: 'Sunglasses', emoji: '🕶️', desc: 'UV protection & style', color: 'from-purple-500 to-purple-600' },
  { id: 'contact-lenses', label: 'Contact Lenses', emoji: '🔵', desc: 'Daily & monthly wear', color: 'from-teal-500 to-teal-600' },
];

const BENEFITS = [
  { icon: FiTruck, title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: FiStar, title: '1000+ Styles', desc: 'Latest frames & designs' },
  { icon: FiShield, title: 'Lens Experts', desc: 'Certified opticians' },
  { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', review: 'Amazing quality glasses! The lens customization was so easy. Delivery was super fast.', rating: 5, location: 'Mumbai' },
  { name: 'Rahul Verma', review: 'Best eyewear shopping experience. The frames are stylish and very affordable.', rating: 5, location: 'Delhi' },
  { name: 'Sneha Patel', review: 'Great collection and helpful customer service. My progressive lenses fit perfectly.', rating: 4, location: 'Ahmedabad' },
];

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products?sort=rating&limit=8')
      .then(res => setTrending(res.data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const headline = 'See Clearly. Live Confidently.'.split(' ');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl"
          />
        </div>

        {/* Floating glasses decoration */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-8 top-1/4 text-8xl opacity-20 hidden xl:block"
        >
          👓
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute right-32 bottom-1/4 text-6xl opacity-20 hidden xl:block"
        >
          🕶️
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-amber-400 text-sm">⭐</span>
              <span className="text-white/90 text-sm font-medium">India's #1 Online Eyewear Store</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              {headline.map((word, i) => (
                <motion.span key={i} custom={i} initial="hidden" animate="visible" variants={wordVariants} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl text-white/75 mb-8 leading-relaxed"
            >
              Premium eyewear crafted for the modern lifestyle. Over 1000+ styles starting at just ₹499.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link
                to="/products?category=eyeglasses"
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg text-sm"
              >
                👓 Shop Eyeglasses
              </Link>
              <Link
                to="/products?category=sunglasses"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                🕶️ Explore Sunglasses
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="max-w-xl"
            >
              <SearchBar className="w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-500">Find the perfect eyewear for every occasion</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/products?category=${cat.id}`}>
                  <div className={`relative bg-gradient-to-br ${cat.color} rounded-2xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="text-6xl mb-4"
                    >
                      {cat.emoji}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-1">{cat.label}</h3>
                    <p className="text-white/80 text-sm mb-4">{cat.desc}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      Shop Now <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
              <p className="text-gray-500">Most loved styles this season</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:gap-2 transition-all">
              View All <FiArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : trending.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)
            }
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl hover:bg-blue-50 transition-colors"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <b.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
            <p className="text-gray-500">Trusted by 50,000+ happy customers across India</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <StarRating rating={t.rating} size="md" />
                <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-4">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Start Your Vision Journey Today
            </h2>
            <p className="text-white/80 text-lg mb-8">Free eye test consultation with every purchase above ₹2,000</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-xl text-base"
            >
              Shop Now <FiArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
