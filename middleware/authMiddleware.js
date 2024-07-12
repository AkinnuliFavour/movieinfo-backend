const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  console.log(req.cookies);

  try {
    // Get the token from cookie
    const token = req.cookies.token;

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Find the user
    const user = await User.findById(data.id);

    if (!user) {
      throw new Error();
    }

    // Attach the user to the request object
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = { userVerification };
