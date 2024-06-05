const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method (similar to class methods in cpp/Java, static: belonging to the class as opposed to instance)
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("all fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }

  //use 'this', can't use "User" since not created in userModel file
  const exists = await this.findOne({ email });

  //if User email exists
  if (exists) {
    throw Error("Email already in use");
  }
  //increase security: addition of "salt" to password, then hash it
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //this creates a new User in the Users db, tgt with hashed password
  const user = await this.create({ email, password: hash });

  return user;
};
module.exports = mongoose.model("User", userSchema);
