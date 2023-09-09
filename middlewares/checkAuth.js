const { User } = require("../models/user.model");
const { verifyToken } = require("../utils/auth");
const { connectDB } = require("../utils/connectDB");

const checkAuth = async (req, res, next) => {
  const { authorization } = req?.headers ?? false;

  try{
    
  }
  if (authorization) {
    const [bearer, token] = authorization.split(" ");
    if (bearer && bearer.toLowerCase() === "bearer") {
      if (token) {
        const verify = verifyToken(token);
        if (verify) {
          await connectDB();
          const user = await User.findOne({ email: verify.email });
          req.isAuthenticated = !!user;
          if (!user)
            next({ status: 401, message: "not found user login again" });
          req.user = {
            fullName: user.firstName + " " + user.lastName,
            email: user.email,
          };
          return next();
        }
        next({ status: 401, message: "authentication fialed login again" });
      }
      next({ status: 401, message: "authentication fialed login again" });
    }
    next({ status: 401, message: "authentication fialed login again" });
  }
  next({ status: 401, message: "authentication fialed login again" });
};

module.exports = {
  checkAuth,
};
