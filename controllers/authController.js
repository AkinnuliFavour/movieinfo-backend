const User = require("../models/User");
const { createSecretToken } = require("../utils/secretToken");
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

    console.log(token);

    // res.cookie().json({token: token});

    return res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: false
    }).status(200).json("User logged in successfully!");

    // Store token in cookie
//     if(token){
//       res.cookie("token", token, {
//         withCredentials: true,
//         httpOnly: true,
//         sameSite: "none",
//         maxAge: 1000 * 60 * 60 * 24, // 24 hours
//         secure: false
//       });
// 
//       // Store admin status in cookie
//       res.cookie("admin", user.admin, {
//         withCredentials: true,
//         httpOnly: true,
//       });
// 
//       res.status(200).json("User logged in successfully!")
//     }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { login };
