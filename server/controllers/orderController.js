const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc Create order
// @route POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }
    let itemsPrice = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      const price = item.price || product.price;
      itemsPrice += price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price,
        lensCustomization: item.lensCustomization
      });
    }
    const taxPrice = Math.round(itemsPrice * 0.18 * 100) / 100;
    const shippingPrice = itemsPrice > 1000 ? 0 : 99;
    const totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    // Optionally clear cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get user orders
// @route GET /api/orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name brand images')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order by ID
// @route GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name brand images');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Ensure the order belongs to the requesting user (unless admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getOrderById };
