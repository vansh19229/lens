import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiPackage, FiShield, FiRefreshCw, FiTruck } from 'react-icons/fi';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ui/ProductCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import api from '../utils/api';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '1000+', label: 'Styles Available' },
  { value: '4.9', label: 'Average Rating' },
  { value: 'Free', label: 'Returns & Exchanges' },
];

const categories = [
  {
    title: 'Eyeglasses',
    description: 'Prescription & fashion frames for every face shape',
    emoji: '👓',
    gradient: 'from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10',
    border: 'border-blue-200 dark:border-blue-800/50',
    href: '/products?category=eyeglasses',
    cta: 'Shop Eyeglasses',
  },
  {
    title: 'Sunglasses',
    description: 'Protect your eyes in style with our premium collection',
    emoji: '🕶️',
    gradient: 'from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10',
    border: 'border-amber-200 dark:border-amber-800/50',
    href: '/products?category=sunglasses',
    cta: 'Shop Sunglasses',
  },
  {
    title: 'Contact Lenses',
    description: 'Crystal clear vision without the frame',
    emoji: '💧',
    gradient: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
    border: 'border-emerald-200 dark:border-emerald-800/50',
    href: '/products?category=contact-lenses',
    cta: 'Shop Lenses',
  },
];

const benefits = [
  { icon: FiTruck, title: 'Free Delivery', desc: 'On all orders over ₹999', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: FiShield, title: 'Authentic Products', desc: '100% genuine eyewear brands', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day hassle-free returns', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: FiPackage, title: 'Expert Support', desc: 'Lens experts ready to help', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
];

const testimonials = [
  { name: 'Priya Sharma', location: 'Mumbai', rating: 5, text: 'Amazing quality and super fast delivery! Love my new glasses.', avatar: 'P' },
  { name: 'Rahul Mehta', location: 'Delhi', rating: 5, text: 'Best eyewear store online. The lens customization is fantastic.', avatar: 'R' },
  { name: 'Anita Patel', location: 'Bangalore', rating: 5, text: 'Premium quality at affordable prices. Highly recommend!', avatar: 'A' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products?sort=rating&limit=8');
        setProducts(res.data.products || []);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 dark:from-blue-500/3 dark:to-purple-500/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800/50"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Premium Eyewear Collection 2024
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-6"
            >
              See the World
              <br />
              <span className="gradient-text">in Style</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl"
            >
              Discover 1000+ premium eyewear styles. From prescription glasses to designer sunglasses — crafted for your vision.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 max-w-xl"
            >
              <SearchBar
                placeholder="Search by brand, style, or type..."
                className="w-full"
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/products?category=eyeglasses"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Shop Eyeglasses
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=sunglasses"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Sunglasses
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Shop by Category</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Find the perfect eyewear that matches your style and vision needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={cat.href}
                  className={`group flex flex-col p-8 rounded-3xl bg-gradient-to-br ${cat.gradient} border ${cat.border} hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1`}
                >
                  <span className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">{cat.emoji}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{cat.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">{cat.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all duration-200">
                    {cat.cta}
                    <FiArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Top Picks</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Trending Now</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/products?sort=rating"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
              >
                View All
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : products.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))
            }
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Why Choose LensMaster?</h2>
            <p className="text-slate-500 dark:text-slate-400">Experience premium eyewear shopping like never before</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${benefit.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Loved by Thousands</h2>
            <p className="text-slate-500 dark:text-slate-400">Real reviews from our happy customers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Your Vision Journey Today
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Get free delivery on your first order + exclusive member discounts
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Create Free Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
