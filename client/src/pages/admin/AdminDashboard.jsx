import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiDollarSign, FiUsers, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import api from '../../utils/api';
import { formatPrice, getOrderStatusColor } from '../../utils/helpers';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: FiPackage, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Revenue', value: formatPrice(stats?.revenue || 0), icon: FiDollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: FiUsers, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: FiShoppingBag, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-gray-200 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map(card => (
            <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                  <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
                </div>
                <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <card.icon size={20} className={card.color} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-blue-600 text-sm hover:underline">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Order ID', 'Customer', 'Date', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(stats?.recentOrders || []).map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-600">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-5 py-3.5 font-medium">{order.user?.name || '—'}</td>
                    <td className="px-5 py-3.5 text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-3.5 font-semibold">{formatPrice(order.totalPrice)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                  <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
