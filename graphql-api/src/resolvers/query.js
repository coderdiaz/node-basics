const { ProductModel } = require('../models/Product');
const { UserModel } = require('../models/User');

const Query = {
  status: () => {
    return `Welcome to GraphQL`;
  },
  products: async () => {
    const products = await ProductModel.find();
    return products;
  },
  users: async (parent, { page, limit, sort, sortBy }) => {
    const skip = (page - 1) * limit;
    const users = await UserModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        [`${sortBy}`]: `${sort}`
      })
      .exec();

    return users;
  }
};

module.exports = Query;