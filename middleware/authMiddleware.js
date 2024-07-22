const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  console.log(req.cookies);

  try {
    // Get the token from cookie
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(401).json({ message: "Please authenticate." })
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Find the user
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "User cannot be found." })
    }

    // Attach the user to the request object
    req.user = user;
    req.token = token;

    return next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};
module.exports = userVerification;
