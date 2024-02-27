const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
// console.log(secretKey);

function generateToken(payload) {
  // console.log(payload);
  return jwt.sign(payload, secretKey);
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
