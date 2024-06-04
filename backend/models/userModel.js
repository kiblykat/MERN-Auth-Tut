const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

//static signup method (similar to class methods in cpp/Java)
userSchema.statics.signup = async function (email, password) {
  //can't use "User" since not created in userModel file
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  //addition of "salt" to password, increases security
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};
module.exports = mongoose.model("User", userSchema);
