const { connectDB } = require("../utils/connectDB");
const { User } = require("../models/user.model");
const { hashPassword } = require("../utils/auth");

const login = async (req, res, next) => {
  res.send("login system");
};

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      throw { status: 404, message: "invalid data" };
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { status: 400, message: "this email is already registered" };
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword(password),
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
