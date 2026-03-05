require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('./seedData');
const connectDB = require('./db');

const seedProducts = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Starting seed...');

    await Product.deleteMany({});
    console.log('Existing products cleared.');

    const inserted = await Product.insertMany(products);
    console.log(`Successfully seeded ${inserted.length} products.`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedProducts();
