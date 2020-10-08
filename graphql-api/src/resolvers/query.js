const { ProductModel } = require('../models/Product');

const Query = {
  status: () => {
    return `Welcome to GraphQL`;
  },
  products: async () => {
    const products = await ProductModel.find();
    return products;
  },
};

module.exports = Query;