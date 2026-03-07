import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiPackage, FiLock, FiEdit2, FiSave, FiEye, FiEyeOff, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'orders', label: 'Orders', icon: FiPackage },
  { id: 'security', label: 'Security', icon: FiLock },
];

const statusColors = {
  pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  processing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  shipped: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  delivered: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await api.get('/orders');
      setOrders(res.data.orders || []);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleProfileSave = async () => {
    setProfileLoading(true);
    try {
      await updateProfile(profileForm);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setPasswordLoading(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 mb-8 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-slate-900 dark:text-white text-lg">Personal Information</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    disabled={!editing}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className={`${inputClass} opacity-60`}
                  />
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    disabled={!editing}
                    placeholder="Enter phone number"
                    className={inputClass}
                  />
                </div>

                {editing && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleProfileSave}
                    disabled={profileLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-60"
                  >
                    {profileLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiSave className="w-4 h-4" />
                    )}
                    Save Changes
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {ordersLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
                      <div className="skeleton h-4 rounded-full w-1/3 mb-3" />
                      <div className="skeleton h-3 rounded-full w-1/2" />
                    </div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">No orders yet</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">Your order history will appear here</p>
                  <Link to="/products" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Order ID</p>
                          <p className="font-mono text-sm font-medium text-slate-900 dark:text-white">#{order._id?.slice(-8).toUpperCase()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize ${statusColors[order.status] || statusColors.pending}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Items</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{order.items?.length || 0} items</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">₹{order.totalAmount?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Link
                          to={`/orders/${order._id}`}
                          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          View <FiChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6"
            >
              <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-6">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
                {[
                  { id: 'current', field: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password' },
                  { id: 'new', field: 'newPassword', label: 'New Password', placeholder: 'Min. 6 characters' },
                  { id: 'confirm', field: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Repeat new password' },
                ].map(({ id, field, label, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
                    <div className="relative">
                      <input
                        type={showPasswords[id] ? 'text' : 'password'}
                        value={passwordForm[field]}
                        onChange={(e) => setPasswordForm({ ...passwordForm, [field]: e.target.value })}
                        required
                        placeholder={placeholder}
                        className={`${inputClass} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(p => ({ ...p, [id]: !p[id] }))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        {showPasswords[id] ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 disabled:opacity-60 transition-all"
                >
                  {passwordLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiLock className="w-4 h-4" />
                  )}
                  Update Password
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
