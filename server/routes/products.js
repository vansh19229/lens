const express = require('express');
const router = express.Router();
const { getProducts, searchProducts, getProductById } = require('../controllers/productController');
const { searchLimiter } = require('../middleware/rateLimiter');

router.get('/', getProducts);
router.get('/search', searchLimiter, searchProducts);
router.get('/:id', getProductById);

module.exports = router;
