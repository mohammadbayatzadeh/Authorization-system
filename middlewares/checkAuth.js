const { User } = require("../models/user.model");
const { verifyToken } = require("../utils/auth");
const { connectDB } = require("../utils/connectDB");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const [bearer, token] = authorization.split(" ");
    bearer.toLowerCase() !== "bearer" &&
      next({ status: 401, message: "authentication fialed login again" });
    const verify = verifyToken(token);
    await connectDB();
    const user = await User.findOne({ email: verify.email });
    req.isAuthenticated = !!user;
    if (!user) next({ status: 401, message: "not found user login again" });
    req.user = {
      fullName: user.firstName + " " + user.lastName,
      email: user.email,
    };
    return next();
  } catch (err) {
    next({ status: 401, message: "authentication failed login again" });
  }
};

module.exports = {
  checkAuth,
};
