import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiLock, FiEdit2, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatPrice, getOrderStatusColor } from '../utils/helpers';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'profile', label: 'My Profile', icon: FiUser },
  { id: 'orders', label: 'My Orders', icon: FiPackage },
  { id: 'security', label: 'Security', icon: FiLock },
];

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeTab === 'orders') {
      setOrdersLoading(true);
      api.get('/orders')
        .then(res => setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []))
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(profileForm);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) { toast.error('Passwords do not match'); return; }
    setSaving(true);
    try {
      await api.put('/auth/change-password', { currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Password updated!');
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3 text-white text-3xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <p className="font-bold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
            {user?.role === 'admin' && (
              <span className="mt-2 inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">Admin</span>
            )}
          </div>
          <nav className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                <button onClick={() => setEditing(!editing)} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
                  <FiEdit2 size={14} /> {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              <form onSubmit={handleProfileSave}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Phone', key: 'phone', type: 'tel' },
                  ].map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
                      {editing ? (
                        <input
                          type={type}
                          value={profileForm[key]}
                          onChange={e => setProfileForm(p => ({...p, [key]: e.target.value}))}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium py-2.5">{user?.[key] || '—'}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-gray-900 font-medium py-2.5">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                    <p className="text-gray-900 font-medium py-2.5">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}</p>
                  </div>
                </div>
                {editing && (
                  <button type="submit" disabled={saving} className="mt-5 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </form>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order History</h2>
              {ordersLoading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📦</div>
                  <p className="text-gray-500 mb-4">No orders yet</p>
                  <Link to="/products" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold">Start Shopping</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <Link key={order._id} to={`/orders/${order._id}`} className="block bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                          <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-IN')} · {order.items?.length} item(s)</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatPrice(order.totalPrice)}</p>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getOrderStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
                {[
                  { label: 'Current Password', key: 'currentPassword' },
                  { label: 'New Password', key: 'newPassword' },
                  { label: 'Confirm New Password', key: 'confirmPassword' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                    <input
                      type="password"
                      required
                      minLength={key !== 'currentPassword' ? 6 : undefined}
                      value={pwdForm[key]}
                      onChange={e => setPwdForm(p => ({...p, [key]: e.target.value}))}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                ))}
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {saving ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
