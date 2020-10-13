const { ProductModel } = require('../models/Product');
const { UserModel } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  // (parent, args, context)
  createProduct: async (parent, { input }, { user }) => {
    if (!user) throw Error('Unauthorized');
    if (!['admin'].includes(user.rol)) throw Error('Forbidden')

    const product = new ProductModel({
      name: input.name,
      price: input.price,
      description: input.description || '',
      featuredImage: input.featuredImage,
    });
    await product.save();
    return product;
  },
  createUser: async (parent, { input }, { user }) => {
    if (!user) throw Error('Unauthorized');
    if (!['admin'].includes(user.rol)) throw Error('Forbidden')

    const encryptedPassword = await bcrypt.hash(input.password, 10);
    const newUser = new UserModel({
      email: input.email,
      name: input.name,
      password: encryptedPassword,
      rol: input.rol,
    });

    newUser.save();
    return newUser;
  },
  signup: async (parent, { input }) => {
    const encryptedPassword = await bcrypt.hash(input.password, 10);
    const user = new UserModel({
      email: input.email,
      name: input.name,
      password: encryptedPassword,
      rol: 'client',
    });
    user.save();

    const token = jwt.sign({ userId: user._id }, 'secretkey')
    return {
      token,
      user,
    };
  },
  login: async (parent, { email, password }) => {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      throw Error('Unauthorized');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw Error('Unauthorized');
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey')
    return {
      token,
      user,
    };
  },
};

module.exports = Mutation;