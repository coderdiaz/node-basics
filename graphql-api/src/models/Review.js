const mongoose = require('mongose');

// Schema
const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  description: String,
});

// Mongoose model
const ReviewModel = mongoose.model('Review', ReviewSchema);
module.exports = { ReviewModel, ReviewSchema };