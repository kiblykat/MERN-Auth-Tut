const express = require("express");
// controller functions (ES module syntax)
const { loginUser, signupUser } = require("../controllers/userController");
const User = require("../models/userModel");

const router = express.Router();

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ count: users.length, data: users });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
