const express = require('express');
const router = express.Router();
const { addReview, getProductReviews } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');
const { validateReview } = require('../middleware/validate');

router.get('/product/:productId', getProductReviews);
router.post('/', verifyToken, validateReview, addReview);

module.exports = router;
