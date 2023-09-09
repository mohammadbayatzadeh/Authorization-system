const { Router } = require("express");
const { authRoutes } = require("./auth.routes");
const { userRoutes } = require("./user.routes");
const { checkAuth } = require("../middlewares/checkAuth");

const router = Router();
router.use("/auth", authRoutes);
router.use("/user", checkAuth, userRoutes);

module.exports = {
  allRoutes: router,
};
