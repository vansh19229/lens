import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiCheck, FiTruck, FiHome, FiArrowLeft } from 'react-icons/fi';
import api from '../utils/api';
import { formatPrice, getOrderStatusColor } from '../utils/helpers';

const STATUS_STEPS = ['pending', 'processing', 'shipped', 'delivered'];

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data.order || res.data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-40 bg-gray-200 rounded-2xl" />
      <div className="h-60 bg-gray-200 rounded-2xl" />
    </div>
  );

  if (!order) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Order not found</h2>
      <Link to="/profile" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">View Orders</Link>
    </div>
  );

  const statusIdx = STATUS_STEPS.indexOf((order.orderStatus || 'Pending').toLowerCase());

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/profile" className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline mb-6">
        <FiArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order #{order._id?.slice(-8).toUpperCase()}</h1>
            <p className="text-sm text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
          </div>
          <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${getOrderStatusColor(order.orderStatus)}`}>
            {order.orderStatus}
          </span>
        </div>

        {/* Status tracker */}
        {order.orderStatus?.toLowerCase() !== 'cancelled' && (
          <div className="flex items-center mb-6">
            {STATUS_STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`flex flex-col items-center ${i <= statusIdx ? 'text-blue-600' : 'text-gray-300'}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 transition-all ${
                    i < statusIdx ? 'bg-blue-600 text-white' : i === statusIdx ? 'border-2 border-blue-600 text-blue-600' : 'border-2 border-gray-200 text-gray-300'
                  }`}>
                    {i < statusIdx ? <FiCheck size={16} /> :
                     s === 'pending' ? <FiPackage size={16} /> :
                     s === 'shipped' ? <FiTruck size={16} /> :
                     s === 'delivered' ? <FiHome size={16} /> :
                     <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <span className="text-xs capitalize hidden sm:block">{s}</span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${i < statusIdx ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Items */}
        <div className="space-y-3 mb-6">
          {order.items?.map((item, i) => {
            const product = item.product || {};
            return (
              <div key={i} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                <div className="w-14 h-14 bg-white rounded-lg border border-gray-100 flex-shrink-0 flex items-center justify-center">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-2xl">{product.category === 'sunglasses' ? '🕶️' : '👓'}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{product.name || 'Product'}</p>
                  {item.lensCustomization && (
                    <p className="text-xs text-purple-600">+ {item.lensCustomization.lensType}</p>
                  )}
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Shipping */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">Shipping Address</h3>
            <p className="text-sm text-gray-600">{order.shippingAddress?.name}</p>
            <p className="text-sm text-gray-600">{order.shippingAddress?.phone}</p>
            <p className="text-sm text-gray-600">{order.shippingAddress?.street}</p>
            <p className="text-sm text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">Price Details</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Items</span><span>{formatPrice(order.itemsPrice)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{order.shippingPrice === 0 ? 'Free' : formatPrice(order.shippingPrice)}</span></div>
              <div className="flex justify-between text-gray-600"><span>GST</span><span>{formatPrice(order.taxPrice)}</span></div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span><span className="text-blue-600">{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
