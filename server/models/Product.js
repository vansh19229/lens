const mongoose = require('mongoose');

const lensOptionsSchema = new mongoose.Schema({
  types: [String],
  materials: [String],
  coatings: [String],
  pricing: {
    singleVision: { type: Number, default: 0 },
    bifocal: { type: Number, default: 0 },
    progressive: { type: Number, default: 0 },
    plastic: { type: Number, default: 0 },
    polycarbonate: { type: Number, default: 0 },
    highIndex: { type: Number, default: 0 },
    antiGlare: { type: Number, default: 0 },
    blueLightFilter: { type: Number, default: 0 },
    uvProtection: { type: Number, default: 0 },
    scratchResistant: { type: Number, default: 0 }
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['eyeglasses', 'sunglasses', 'contact-lenses'] },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [String],
  frameType: { type: String },
  frameShape: { type: String },
  gender: { type: String, enum: ['men', 'women', 'unisex'] },
  colors: [String],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  badge: { type: String, enum: ['New', 'Trending', 'Sale', null], default: null },
  isActive: { type: Boolean, default: true },
  lensOptions: lensOptionsSchema
}, { timestamps: true });

productSchema.index({ name: 'text', brand: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
