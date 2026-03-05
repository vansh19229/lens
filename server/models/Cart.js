const mongoose = require('mongoose');

const cartLensCustomizationSchema = new mongoose.Schema({
  lensType: String,
  material: String,
  coating: String,
  prescription: {
    rightEye: { sph: Number, cyl: Number, axis: Number },
    leftEye: { sph: Number, cyl: Number, axis: Number },
    pd: Number
  },
  prescriptionFile: String
}, { _id: false });

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  lensCustomization: cartLensCustomizationSchema
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
