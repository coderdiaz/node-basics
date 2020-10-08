const mongoose = require('mongoose');

// Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  featuredImage: String,
}, {
  timestamps: true,
});

// Mongoose model
const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = { ProductModel, ProductSchema };
