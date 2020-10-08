const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const CheckoutModel = mongoose.model('Checkout', CheckoutSchema);
module.exports = { CheckoutModel, CheckoutSchema };