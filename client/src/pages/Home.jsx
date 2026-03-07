import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiTruck, FiShield, FiStar, FiRefreshCw, FiArrowRight, FiZap } from 'react-icons/fi';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ui/ProductCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import StarRating from '../components/ui/StarRating';
import api from '../utils/api';

const CATEGORIES = [
  { id: 'eyeglasses', label: 'Eyeglasses', emoji: '👓', desc: 'Prescription & fashion frames', gradient: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500/20', glow: 'rgba(59,130,246,0.15)' },
  { id: 'sunglasses', label: 'Sunglasses', emoji: '🕶️', desc: 'UV protection & style', gradient: 'from-violet-600/20 to-purple-600/20', border: 'border-violet-500/20', glow: 'rgba(139,92,246,0.15)' },
  { id: 'contact-lenses', label: 'Contact Lenses', emoji: '🔵', desc: 'Daily & monthly wear', gradient: 'from-teal-600/20 to-emerald-600/20', border: 'border-teal-500/20', glow: 'rgba(20,184,166,0.15)' },
];

const BENEFITS = [
  { icon: FiTruck, title: 'Free Delivery', desc: 'On orders above ₹999', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: FiStar, title: '1000+ Styles', desc: 'Latest frames & designs', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: FiShield, title: 'Lens Experts', desc: 'Certified opticians', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day return policy', color: 'text-violet-400', bg: 'bg-violet-500/10' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', review: 'Amazing quality glasses! The lens customization was so easy. Delivery was super fast.', rating: 5, location: 'Mumbai', avatar: 'P' },
  { name: 'Rahul Verma', review: 'Best eyewear shopping experience. The frames are stylish and very affordable.', rating: 5, location: 'Delhi', avatar: 'R' },
  { name: 'Sneha Patel', review: 'Great collection and helpful customer service. My progressive lenses fit perfectly.', rating: 4, location: 'Ahmedabad', avatar: 'S' },
];

const STATS = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '1000+', label: 'Frame Styles' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '24h', label: 'Express Delivery' },
];

const FloatingCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className={`glass-card p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    api.get('/products?sort=rating&limit=8')
      .then(res => setTrending(res.data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#080808] min-h-screen">
      {/* ── Hero Section ───────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f1b3d_0%,_#080808_60%)]" />

          {/* Animated orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full orb-animate glow-pulse"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full orb-animate-slow glow-pulse"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)' }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Copy */}
            <motion.div style={{ opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80 text-sm font-medium">India's #1 Online Eyewear Store</span>
                <FiZap size={12} className="text-amber-400" />
              </motion.div>

              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="block"
                >
                  See Clearly.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="block gradient-text"
                >
                  Live Boldly.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-white/50 mb-10 leading-relaxed max-w-lg"
              >
                Premium eyewear crafted for the modern lifestyle.
                Over 1000+ styles starting at just <span className="text-white/80 font-semibold">₹499</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  to="/products?category=eyeglasses"
                  className="group flex items-center gap-2.5 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl btn-glow transition-all duration-300 text-sm"
                >
                  <span>👓</span> Shop Eyeglasses
                  <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/products?category=sunglasses"
                  className="group flex items-center gap-2.5 px-7 py-3.5 glass-card text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-300 text-sm hover:border-white/20"
                >
                  <span>🕶️</span> Explore Sunglasses
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="max-w-sm"
              >
                <SearchBar dark />
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex flex-wrap gap-6 mt-10"
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Floating product showcase */}
            <div className="hidden lg:block relative h-[560px]">
              {/* Central glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
              </div>

              {/* Main product float */}
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[160px] select-none filter drop-shadow-[0_0_60px_rgba(37,99,235,0.4)]"
              >
                👓
              </motion.div>

              {/* Floating info cards */}
              <FloatingCard delay={0.8} className="absolute top-12 right-0 w-52">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">🕶️</div>
                  <div>
                    <p className="text-white text-sm font-semibold">Ray-Ban Classic</p>
                    <p className="text-white/50 text-xs">₹2,499</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xs">★</span>
                  ))}
                  <span className="text-white/40 text-xs ml-1">5.0</span>
                </div>
              </FloatingCard>

              <FloatingCard delay={1.0} className="absolute bottom-20 left-0 w-48">
                <p className="text-white/50 text-xs mb-1.5">Trending Now</p>
                <p className="text-white font-semibold text-sm">Aviator Gold</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-400 font-bold text-sm">₹1,799</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">-30%</span>
                </div>
              </FloatingCard>

              <FloatingCard delay={1.2} className="absolute top-1/3 left-4 w-44">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔵</span>
                  <div>
                    <p className="text-white text-xs font-semibold">Daily Lenses</p>
                    <p className="text-white/50 text-xs">30-pack</p>
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard delay={1.4} className="absolute bottom-12 right-8 w-40">
                <p className="text-emerald-400 text-xs font-semibold mb-1">✓ Free Delivery</p>
                <p className="text-white/60 text-xs">Above ₹999</p>
              </FloatingCard>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      </section>

      {/* ── Categories ─────────────────────── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Collections</p>
            <h2 className="text-4xl font-bold text-white mb-3">Shop by Category</h2>
            <p className="text-white/40 max-w-md mx-auto">Find the perfect eyewear for every occasion and lifestyle</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Link to={`/products?category=${cat.id}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative group bg-gradient-to-br ${cat.gradient} border ${cat.border} rounded-3xl p-8 overflow-hidden cursor-pointer`}
                    style={{ boxShadow: `0 0 0 0 ${cat.glow}`, transition: 'box-shadow 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${cat.glow}`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 0 ${cat.glow}`}
                  >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />

                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="text-6xl mb-5"
                    >
                      {cat.emoji}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-1.5">{cat.label}</h3>
                    <p className="text-white/50 text-sm mb-6">{cat.desc}</p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-200">
                      Shop Now
                      <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Products ───────────────── */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-2">Hot Right Now</p>
              <h2 className="text-4xl font-bold text-white mb-2">Trending Styles</h2>
              <p className="text-white/40">Most loved frames this season</p>
            </div>
            <Link to="/products"
              className="group hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200">
              View All
              <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : trending.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)
            }
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 border border-blue-500/30 px-5 py-2.5 rounded-xl hover:bg-blue-500/10 transition-all duration-200">
              View All Products <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 text-center group"
              >
                <div className={`w-12 h-12 ${b.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <b.icon size={22} className={b.color} />
                </div>
                <h3 className="font-semibold text-white mb-1">{b.title}</h3>
                <p className="text-sm text-white/40">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof / Testimonials ──────── */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold text-white mb-3">Loved by 50,000+ customers</h2>
            <p className="text-white/40">Real stories from real people across India</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="glass-card p-7 group"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-white/30">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative glass-card p-16 overflow-hidden"
          >
            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />

            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">Limited Time Offer</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Start Your Vision <span className="gradient-text">Journey Today</span>
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Free eye test consultation with every purchase above ₹2,000
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-blue-600 text-white font-bold rounded-2xl btn-glow transition-all duration-300 text-base"
            >
              Shop Premium Eyewear
              <FiArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

