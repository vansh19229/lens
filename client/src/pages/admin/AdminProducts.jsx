import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiPackage, FiSave } from 'react-icons/fi';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const INITIAL_FORM = {
  name: '', brand: '', category: 'eyeglasses', price: '', originalPrice: '',
  stock: '', colors: '', images: '', badge: '', frameType: '', frameShape: '',
  gender: 'Unisex', description: '',
};

const inputClass = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all";
const labelClass = "block text-sm font-medium text-slate-400 mb-1.5";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/products');
      setProducts(res.data.products || []);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingProduct(null);
    setForm(INITIAL_FORM);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || '',
      brand: product.brand || '',
      category: product.category || 'eyeglasses',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      stock: product.stock || '',
      colors: (product.colors || []).join(', '),
      images: (product.images || []).join(', '),
      badge: product.badge || '',
      frameType: product.frameType || '',
      frameShape: product.frameShape || '',
      gender: product.gender || 'Unisex',
      description: product.description || '',
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice) || Number(form.price),
        stock: Number(form.stock),
        colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
        images: form.images.split(',').map(i => i.trim()).filter(Boolean),
      };
      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct._id}`, payload);
        toast.success('Product updated!');
      } else {
        await api.post('/admin/products', payload);
        toast.success('Product created!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted');
      setDeleteId(null);
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-slate-400 text-sm mt-1">{products.length} total products</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm"
        >
          <FiPlus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-800 rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <FiPackage className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-800">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Badge</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : <span className="text-lg">👓</span>}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white line-clamp-1">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs capitalize">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">₹{product.price?.toLocaleString()}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-xs text-slate-500 line-through">₹{product.originalPrice?.toLocaleString()}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {product.stock > 0 ? product.stock : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.badge ? (
                        <span className="px-2.5 py-1 bg-orange-900/30 text-orange-400 border border-orange-800/40 rounded-lg text-xs">{product.badge}</span>
                      ) : <span className="text-slate-600">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-xl bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800/40 transition-all"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(product._id)}
                          className="p-2 rounded-xl bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-800/40 transition-all"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                <h2 className="font-bold text-white text-lg">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6">
                <form id="product-form" onSubmit={handleSave} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Product Name *</label>
                      <input className={inputClass} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="e.g. Premium Aviator" />
                    </div>
                    <div>
                      <label className={labelClass}>Brand *</label>
                      <input className={inputClass} value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required placeholder="e.g. Ray-Ban" />
                    </div>
                    <div>
                      <label className={labelClass}>Category *</label>
                      <select className={inputClass} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                        <option value="eyeglasses">Eyeglasses</option>
                        <option value="sunglasses">Sunglasses</option>
                        <option value="contact-lenses">Contact Lenses</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Gender</label>
                      <select className={inputClass} value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                        <option value="Unisex">Unisex</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Price (₹) *</label>
                      <input type="number" className={inputClass} value={form.price} onChange={e => setForm({...form, price: e.target.value})} required placeholder="1999" />
                    </div>
                    <div>
                      <label className={labelClass}>Original Price (₹)</label>
                      <input type="number" className={inputClass} value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} placeholder="2499" />
                    </div>
                    <div>
                      <label className={labelClass}>Stock *</label>
                      <input type="number" className={inputClass} value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required placeholder="50" />
                    </div>
                    <div>
                      <label className={labelClass}>Badge</label>
                      <select className={inputClass} value={form.badge} onChange={e => setForm({...form, badge: e.target.value})}>
                        <option value="">None</option>
                        <option value="New">New</option>
                        <option value="Trending">Trending</option>
                        <option value="Sale">Sale</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Frame Type</label>
                      <select className={inputClass} value={form.frameType} onChange={e => setForm({...form, frameType: e.target.value})}>
                        <option value="">Select</option>
                        <option value="Full Rim">Full Rim</option>
                        <option value="Half Rim">Half Rim</option>
                        <option value="Rimless">Rimless</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Frame Shape</label>
                      <select className={inputClass} value={form.frameShape} onChange={e => setForm({...form, frameShape: e.target.value})}>
                        <option value="">Select</option>
                        {['Rectangle', 'Round', 'Square', 'Oval', 'Cat Eye', 'Aviator', 'Wayfarer'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Colors (comma-separated)</label>
                    <input className={inputClass} value={form.colors} onChange={e => setForm({...form, colors: e.target.value})} placeholder="black, brown, gold" />
                  </div>
                  <div>
                    <label className={labelClass}>Image URLs (comma-separated)</label>
                    <input className={inputClass} value={form.images} onChange={e => setForm({...form, images: e.target.value})} placeholder="https://..." />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea className={`${inputClass} resize-none`} value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} placeholder="Product description..." />
                  </div>
                </form>
              </div>
              <div className="px-6 py-5 border-t border-slate-800 flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-slate-700 text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button
                  form="product-form"
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all disabled:opacity-60"
                >
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSave className="w-4 h-4" />}
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-800/40">
                <FiTrash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Delete Product</h3>
              <p className="text-slate-400 text-sm mb-6">This action cannot be undone. The product will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 border border-slate-700 text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
