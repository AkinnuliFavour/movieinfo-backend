const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(403);
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.sendStatus(403);
    }
  });
  next();
};

module.exports = { userVerification };
