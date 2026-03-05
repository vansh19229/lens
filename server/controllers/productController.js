const Product = require('../models/Product');

// @desc Get all products with filters
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const {
      category, brand, frameType, frameShape, gender, color,
      priceMin, priceMax, search, sort, page = 1, limit = 12
    } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;
    if (brand) query.brand = { $regex: brand, $options: 'i' };
    if (frameType) query.frameType = frameType;
    if (frameShape) query.frameShape = frameShape;
    if (gender) query.gender = gender;
    if (color) query.colors = { $in: [color] };
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }
    if (search) {
      query.$text = { $search: search };
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else sortOption = { createdAt: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Product.countDocuments(query)
    ]);

    res.json({
      products,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Search products with suggestions
// @route GET /api/products/search
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.json({ suggestions: [] });
    }
    const products = await Product.find({
      isActive: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ]
    })
      .select('name brand category price images')
      .limit(5);

    res.json({ suggestions: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single product
// @route GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, searchProducts, getProductById };
