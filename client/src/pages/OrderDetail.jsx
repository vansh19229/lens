import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import api from '../utils/api';
import toast from 'react-hot-toast';

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: FiClock },
  { key: 'processing', label: 'Processing', icon: FiPackage },
  { key: 'shipped', label: 'Shipped', icon: FiTruck },
  { key: 'delivered', label: 'Delivered', icon: FiCheckCircle },
];

const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.order);
      } catch {
        toast.error('Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Order not found</h2>
          <Link to="/profile" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Back to Profile</Link>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-4">
            <FiArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Order #{order._id?.slice(-8).toUpperCase()}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            {isCancelled ? (
              <span className="px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-sm font-semibold">
                Cancelled
              </span>
            ) : (
              <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-semibold capitalize">
                {order.status}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Status Tracker */}
            {!isCancelled && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-6">Order Status</h2>
                <div className="flex items-center">
                  {statusSteps.map((step, i) => {
                    const isCompleted = i <= currentStatusIndex;
                    const isActive = i === currentStatusIndex;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          } ${isActive ? 'ring-4 ring-blue-500/20' : ''}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <p className={`text-xs mt-2 font-medium text-center leading-tight ${
                            isCompleted ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                          }`}>
                            {step.label}
                          </p>
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div className={`h-0.5 flex-1 mx-2 mb-5 transition-all ${
                            i < currentStatusIndex ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Items */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5">Items Ordered</h2>
              <div className="space-y-4">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                      {item.product?.images?.[0] ? (
                        <img src={item.product.images[0]} alt={item.product?.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">👓</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{item.product?.brand}</p>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1 mt-0.5">{item.product?.name || 'Product'}</p>
                      {item.lensCustomization && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                          {item.lensCustomization.lensType} · {item.lensCustomization.material}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Qty: {item.quantity}</span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-4">Shipping Address</h2>
                <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <p className="font-medium text-slate-900 dark:text-white">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                  {order.shippingAddress.phone && <p>📞 {order.shippingAddress.phone}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5">Payment Summary</h2>
              <div className="space-y-3">
                {[
                  { label: 'Subtotal', value: `₹${(order.subtotal || 0).toLocaleString()}` },
                  { label: 'Shipping', value: order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost}` },
                  { label: 'GST (18%)', value: `₹${(order.taxAmount || 0).toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                    <span className="text-slate-700 dark:text-slate-300">{value}</span>
                  </div>
                ))}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-bold text-lg text-slate-900 dark:text-white">₹{(order.totalAmount || 0).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Payment Method</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white mt-1 capitalize">{order.paymentMethod || 'Online'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
