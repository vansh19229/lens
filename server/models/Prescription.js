const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  filePath: { type: String, required: true },
  originalName: { type: String },
  fileType: { type: String },
  rightEye: {
    sph: Number,
    cyl: Number,
    axis: Number,
    add: Number
  },
  leftEye: {
    sph: Number,
    cyl: Number,
    axis: Number,
    add: Number
  },
  pd: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
