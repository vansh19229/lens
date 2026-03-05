import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
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
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-800 to-blue-900 items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center text-white px-10">
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity }}>
            <span className="text-9xl">🕶️</span>
          </motion.div>
          <h2 className="text-4xl font-extrabold mb-4 mt-8">Join Lens Master</h2>
          <p className="text-white/75 text-lg">Thousands of styles. Perfect fit. Every time.</p>
          <div className="flex justify-center gap-8 mt-8">
            {['50K+ Customers', '1000+ Styles', 'Expert Care'].map(s => (
              <div key={s} className="text-center">
                <p className="text-white font-bold">{s.split(' ')[0]}</p>
                <p className="text-white/60 text-sm">{s.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white">��</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">Lens Master</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Create Account</h1>
          <p className="text-gray-500 mb-8">Already have one? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link></p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', icon: FiUser, type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email Address', icon: FiMail, type: 'email', placeholder: 'you@example.com' },
              { key: 'phone', label: 'Phone Number', icon: FiPhone, type: 'tel', placeholder: '+91 9876543210' },
            ].map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={type}
                    required={key !== 'phone'}
                    value={form[key]}
                    onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white transition-colors"
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={e => setForm(p => ({...p, password: e.target.value}))}
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white transition-colors"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Create Account →'}
            </motion.button>

            <p className="text-xs text-gray-400 text-center">
              By registering, you agree to our <span className="text-blue-600">Terms of Service</span> and <span className="text-blue-600">Privacy Policy</span>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
