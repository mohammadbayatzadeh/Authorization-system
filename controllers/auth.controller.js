const { connectDB } = require("../utils/connectDB");
const { User } = require("../models/user.model");
const { hashPassword, signToken, comparePassword } = require("../utils/auth");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw { status: 404, message: "enter complete data" };
    }
    if (!email.match(/^[a-z+][a-z0-9\.\-]{3,15}@[a-z]{3,10}\.[a-z]{3,10}/gim)) {
      throw { status: 400, message: "invalid email" };
    }

    await connectDB();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw { status: 400, message: "user not found" };
    }

    if (!comparePassword(password, existingUser.password)) {
      throw { status: 400, message: "email or password is incorrect" };
    }

    const token = signToken({ email });
    res.send({ token, message: "login successfully" });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      throw { status: 404, message: "enter complete data" };
    }

    if (!email.match(/^[a-z+][a-z0-9\.\-]{5,15}@[a-z]{3,10}\.[a-z]{3,10}/gim)) {
      throw { status: 400, message: "invalid emial" };
    }

    await connectDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw { status: 400, message: "this email is already registered" };
    }

    const token = signToken({ email });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword(password),
    });

    res.send({ token, user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
