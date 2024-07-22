const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const createSecretToken = (id) => {
  const token = process.env.TOKEN_KEY;
  console.log(id);
  return jwt.sign({ id }, token, {
    expiresIn: '1d',
  });
};

module.exports = { createSecretToken };
