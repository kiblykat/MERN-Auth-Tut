const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//create a function that returns token (with expiry and SECRET key)
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  //destructure email and pw
  const { email, password } = req.body;
  try {
    //login the user
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    return res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //using signup method in userSchema to create the User
    const user = await User.signup(email, password);

    //create a token
    const token = createToken(user._id);

    //now, we are passing the token to the browser as the second property of the response object
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser };
