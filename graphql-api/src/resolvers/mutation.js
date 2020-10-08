const { ProductModel } = require('../models/Product');

const Mutation = {
  createProduct: async (parent, { input }) => {
    const product = new ProductModel({
      name: input.name,
      price: input.price,
      description: input.description || '',
      featuredImage: input.featuredImage,
    });
    await product.save();
    return product;
  },
};

module.exports = Mutation;