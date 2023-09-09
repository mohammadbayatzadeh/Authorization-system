const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

const comparePassword = (pass, hashed) => {
  return compareSync(pass, hashed);
};

const signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return false;
  }
};
module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
};
