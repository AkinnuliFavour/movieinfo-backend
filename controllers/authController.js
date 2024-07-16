const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password is sent in request body
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    // Return an error message if user does not exist
    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    // Check if password is correct
    const auth = bcrypt.compare(password, user.password);

    // Return an error message if password is not correct
    if (!auth) {
      return res.json({ message: "Incorrect password" });
    }

    // Create a jwt token
    const token = createSecretToken(user._id);

    // Store token in cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: true,
    });

    // Store admin status in cookie
    res.cookie("admin", user.admin, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201).ccookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        secure: strict,
      })
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { login };
