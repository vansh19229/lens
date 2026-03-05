import { useState, useEffect } from 'react';
import { FiShield, FiUser } from 'react-icons/fi';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin';
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
      toast.success(`Role updated to ${newRole}`);
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users ({users.length})</h1>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['User', 'Email', 'Phone', 'Role', 'Joined', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="py-10 text-center">
                <div className="flex justify-center"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
              </td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={6} className="py-10 text-center text-gray-400">No users found</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{user.email}</td>
                  <td className="px-5 py-3.5 text-gray-600">{user.phone || '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role === 'admin' ? <FiShield size={10} /> : <FiUser size={10} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-5 py-3.5">
                    {user._id !== currentUser?._id && (
                      <button
                        onClick={() => toggleRole(user._id, user.role)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          user.role === 'admin'
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
