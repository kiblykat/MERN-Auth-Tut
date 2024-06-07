//userController.js handles the logic for signing tokens

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//create a helper function that returns token (with expiry and SECRET key)
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

    //return the token as a response after logging in
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
    //returned user will contain object of {email, hashed p/w}
    const user = await User.signup(email, password);

    //create a token using the user._id (not password/email)
    const token = createToken(user._id);

    //return the token as a response after signing up
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser };
