import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080808]">
      {/* Left side — Animated branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0f1b3d_0%,_#080808_70%)]" />

        {/* Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full orb-animate"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full orb-animate-slow"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-12">
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-[0_0_24px_rgba(99,102,241,0.5)]">
              <span className="text-white text-2xl">👁</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Lens<span className="text-blue-400">Master</span>
            </span>
          </Link>

          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[100px] mb-8 select-none filter drop-shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            👓
          </motion.div>

          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Welcome<br />
            <span className="gradient-text-blue">Back</span>
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-xs mx-auto">
            Your perfect vision is just a login away. Thousands of premium frames await.
          </p>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 glass-card px-5 py-4 inline-flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {['P', 'R', 'S'].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold border-2 border-[#080808]">
                  {l}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">50,000+ customers</p>
              <p className="text-white/40 text-xs">Love Lens Master</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side — Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.05)_0%,_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
              <span className="text-white">👁</span>
            </div>
            <span className="text-xl font-bold text-white">Lens<span className="text-blue-400">Master</span></span>
          </Link>

          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Sign In</h1>
          <p className="text-white/40 mb-8 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
              Create one free →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={17} />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3.5 glass-card text-white text-sm placeholder-white/20 border border-white/08 rounded-xl transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={17} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full pl-11 pr-11 py-3.5 glass-card text-white text-sm placeholder-white/20 border border-white/08 rounded-xl transition-all duration-200"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200">
                  {showPwd ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl btn-glow transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <FiArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <div className="mt-6 p-4 glass-card rounded-xl border border-blue-500/15">
            <p className="text-xs text-blue-400/80 text-center">
              <span className="font-semibold">Demo:</span> Use any registered email &amp; password to login
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

