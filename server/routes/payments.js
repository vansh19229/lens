const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPayment, webhookHandler } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

router.post('/webhook', webhookHandler);
router.use(verifyToken);
router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyPayment);

module.exports = router;
