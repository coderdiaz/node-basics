const mongoose = require('mongoose');

//Schema
const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  rol: String,
},{
  timestamps: true,
});

//Mongoose model
const UserModel = mongoose.model('User', UserSchema);
module.exports = { UserModel, UserSchema };