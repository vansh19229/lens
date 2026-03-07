import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiDollarSign, FiUsers, FiGrid, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import api from '../../utils/api';

const statusColors = {
  pending: 'bg-amber-900/30 text-amber-400',
  processing: 'bg-blue-900/30 text-blue-400',
  shipped: 'bg-purple-900/30 text-purple-400',
  delivered: 'bg-emerald-900/30 text-emerald-400',
  cancelled: 'bg-red-900/30 text-red-400',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/orders?limit=5'),
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.orders || []);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: FiPackage, color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-800/30' },
    { label: 'Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: FiDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-900/20', border: 'border-emerald-800/30' },
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: FiUsers, color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-800/30' },
    { label: 'Products', value: stats?.totalProducts || 0, icon: FiGrid, color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-800/30' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${card.bg} border ${card.border} rounded-2xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${card.bg} rounded-xl border ${card.border} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <FiTrendingUp className="w-4 h-4 text-slate-500" />
            </div>
            {loading ? (
              <div className="h-7 bg-slate-800 rounded-full w-16 mb-1" />
            ) : (
              <p className="text-2xl font-bold text-white">{card.value}</p>
            )}
            <p className="text-sm text-slate-400 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h2 className="font-bold text-white">Recent Orders</h2>
          <Link to="/admin/orders" className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View all <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <FiPackage className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-800">
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-slate-300">#{order._id?.slice(-8).toUpperCase()}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{order.user?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">₹{order.totalAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${statusColors[order.status] || statusColors.pending}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
