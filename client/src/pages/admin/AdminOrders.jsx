import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { formatPrice, getOrderStatusColor } from '../../utils/helpers';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/orders')
      .then(res => setOrders(res.data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, orderStatus) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { orderStatus });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, orderStatus } : o));
      toast.success('Status updated!');
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Order ID', 'Customer', 'Date', 'Items', 'Amount', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="py-10 text-center">
                  <div className="flex justify-center"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
                </td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="py-10 text-center text-gray-400">No orders yet</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-600">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-900">{order.user?.name || '—'}</p>
                      <p className="text-xs text-gray-400">{order.user?.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-3.5 text-gray-600">{order.items?.length || 0}</td>
                    <td className="px-5 py-3.5 font-semibold">{formatPrice(order.totalPrice)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={order.orderStatus || 'Pending'}
                        onChange={e => updateStatus(order._id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s} className="capitalize">{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
