const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  rightEye: {
    sph: Number,
    cyl: Number,
    axis: Number
  },
  leftEye: {
    sph: Number,
    cyl: Number,
    axis: Number
  },
  pd: Number
}, { _id: false });

const lensCustomizationSchema = new mongoose.Schema({
  lensType: String,
  material: String,
  coating: String,
  prescription: prescriptionSchema,
  prescriptionFile: String
}, { _id: false });

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  lensCustomization: lensCustomizationSchema
});

const shippingAddressSchema = new mongoose.Schema({
  name: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  phone: String
}, { _id: false });

const paymentResultSchema = new mongoose.Schema({
  id: String,
  status: String,
  updateTime: String,
  razorpayOrderId: String,
  razorpayPaymentId: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  paymentMethod: { type: String, required: true },
  paymentResult: paymentResultSchema,
  itemsPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  deliveredAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
