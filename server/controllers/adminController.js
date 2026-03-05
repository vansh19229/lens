const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Prescription = require('../models/Prescription');

// @desc Get dashboard stats
// @route GET /api/admin/dashboard
const getDashboard = async (req, res) => {
  try {
    const [totalOrders, totalUsers, totalProducts, revenueResult] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Product.countDocuments({ isActive: true }),
      Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ])
    ]);
    const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    res.json({ totalOrders, totalUsers, totalProducts, revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all products (admin)
// @route GET /api/admin/products
const getAdminProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments()
    ]);
    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add product
// @route POST /api/admin/products
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Edit product
// @route PUT /api/admin/products/:id
const editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete product
// @route DELETE /api/admin/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.isActive = false;
    await product.save();
    res.json({ message: 'Product deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all orders
// @route GET /api/admin/orders
const getAdminOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.orderStatus = status;
    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('user', 'name email')
        .populate('items.product', 'name brand')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Order.countDocuments(query)
    ]);
    res.json({ orders, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update order status
// @route PUT /api/admin/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.orderStatus = orderStatus;
    if (orderStatus === 'Delivered') {
      order.deliveredAt = new Date();
    }
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all users
// @route GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find().select('-password -refreshToken').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      User.countDocuments()
    ]);
    res.json({ users, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user role
// @route PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['customer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all prescriptions
// @route GET /api/admin/prescriptions
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('user', 'name email')
      .populate('order', 'createdAt totalPrice')
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboard, getAdminProducts, addProduct, editProduct, deleteProduct,
  getAdminOrders, updateOrderStatus, getUsers, updateUserRole, getPrescriptions
};
