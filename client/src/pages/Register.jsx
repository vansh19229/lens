import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome to Lens Master 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080808]">
      {/* Left side — Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a0b2e_0%,_#080808_70%)]" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full orb-animate"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full orb-animate-slow"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="relative z-10 text-center px-12">
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.5)]">
              <span className="text-white text-2xl">👁</span>
            </div>
            <span className="text-2xl font-bold text-white">Lens<span className="text-blue-400">Master</span></span>
          </Link>

          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[100px] mb-8 select-none filter drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]"
          >
            🕶️
          </motion.div>

          <h2 className="text-4xl font-black text-white mb-4">
            Join <span className="gradient-text-blue">Lens Master</span>
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-xs mx-auto mb-8">
            Thousands of premium styles. Perfect fit. Expert care. Every time.
          </p>

          <div className="flex justify-center gap-6">
            {[
              { value: '50K+', label: 'Customers' },
              { value: '1000+', label: 'Styles' },
              { value: '4.9★', label: 'Rating' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-white font-bold text-lg">{s.value}</p>
                <p className="text-white/30 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.05)_0%,_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md relative z-10"
        >
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
              <span className="text-white">👁</span>
            </div>
            <span className="text-xl font-bold text-white">Lens<span className="text-blue-400">Master</span></span>
          </Link>

          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-white/40 mb-7 text-sm">
            Already have one?{' '}
            <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
              Sign in →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', icon: FiUser, type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email Address', icon: FiMail, type: 'email', placeholder: 'you@example.com' },
              { key: 'phone', label: 'Phone Number', icon: FiPhone, type: 'tel', placeholder: '+91 9876543210' },
            ].map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-white/60 mb-2">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={17} />
                  <input
                    type={type}
                    required={key !== 'phone'}
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3.5 glass-card text-white text-sm placeholder-white/20 border border-white/08 rounded-xl transition-all duration-200"
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={17} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full pl-11 pr-11 py-3.5 glass-card text-white text-sm placeholder-white/20 border border-white/08 rounded-xl transition-all duration-200"
                  placeholder="Min. 6 characters"
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
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl btn-glow transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-1"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Create Account <FiArrowRight size={16} /></>
              )}
            </motion.button>

            <p className="text-xs text-white/25 text-center">
              By registering, you agree to our{' '}
              <span className="text-blue-400/70">Terms of Service</span> and{' '}
              <span className="text-blue-400/70">Privacy Policy</span>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

