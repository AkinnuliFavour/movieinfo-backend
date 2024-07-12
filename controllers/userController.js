const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
// const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { email, password, isAdmin, createdAt } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password,
      isAdmin,
      createdAt,
    });

    const token = createSecretToken(user._id);

    // store token in cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // store admin status in cookie
    res.cookie("isAdmin", isAdmin, {
      withCredentials: true,
      httpOnly: false,
    });

    if (user) {
      res.status(200).json({ message: "User created successfully", user });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
