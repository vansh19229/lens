const Razorpay = require('razorpay');
const Order = require('../models/Order');
const { verifyRazorpaySignature } = require('../utils/paymentUtils');
const crypto = require('crypto');

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};

// @desc Create Razorpay order
// @route POST /api/payments/create-order
const createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const razorpay = getRazorpayInstance();
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'INR',
      receipt: `order_${order._id}`
    });
    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Verify payment
// @route POST /api/payments/verify
const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.isPaid = true;
    order.paidAt = new Date();
    order.orderStatus = 'Processing';
    order.paymentResult = {
      id: razorpayPaymentId,
      status: 'paid',
      updateTime: new Date().toISOString(),
      razorpayOrderId,
      razorpayPaymentId
    };
    await order.save();
    res.json({ message: 'Payment verified successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Razorpay webhook handler
// @route POST /api/payments/webhook
const webhookHandler = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');
    if (expectedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }
    const event = req.body.event;
    if (event === 'payment.captured') {
      const payment = req.body.payload.payment.entity;
      const receipt = payment.order_id;
      const order = await Order.findOne({ 'paymentResult.razorpayOrderId': receipt });
      if (order && !order.isPaid) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.orderStatus = 'Processing';
        await order.save();
      }
    }
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRazorpayOrder, verifyPayment, webhookHandler };
