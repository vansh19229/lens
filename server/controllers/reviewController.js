const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc Add review
// @route POST /api/reviews
const addReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const existingReview = await Review.findOne({ user: req.user._id, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      title,
      comment
    });
    // Update product rating
    const reviews = await Review.find({ product: productId });
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await product.save();
    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc Get product reviews
// @route GET /api/reviews/product/:productId
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getProductReviews };
