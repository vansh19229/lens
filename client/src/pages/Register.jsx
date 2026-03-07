import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: FiUser },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', icon: FiMail },
    { name: 'phone', label: 'Phone Number (optional)', type: 'tel', placeholder: '+91 98765 43210', icon: FiPhone },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-600 to-blue-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-lg">👁</span>
            </div>
            <span className="font-bold text-white text-xl">LensMaster</span>
          </Link>
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-8xl mb-8 animate-float inline-block"
          >
            🕶️
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Join the LensMaster<br />Community
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed">
            Create your account and explore 1000+ premium eyewear styles with personalized recommendations.
          </p>
          <div className="mt-8 space-y-3">
            {[
              '✓ Free delivery on orders over ₹999',
              '✓ Exclusive member discounts up to 40%',
              '✓ Lens customization for prescriptions',
              '✓ 30-day hassle-free returns',
            ].map((benefit) => (
              <p key={benefit} className="text-purple-100 text-sm">{benefit}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-sm">👁</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg">LensMaster</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create account</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {inputFields.map(({ name, label, type, placeholder, icon: Icon }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      required={name !== 'phone'}
                      placeholder={placeholder}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="Min. 6 characters"
                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-4">
                By creating an account, you agree to our{' '}
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:underline">Privacy Policy</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
