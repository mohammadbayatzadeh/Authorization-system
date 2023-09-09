const { Router } = require("express");
const { getProfile } = require("../controllers/user.controller");

const router = Router();

router.get("/profile", getProfile);

module.exports = {
  userRoutes: router,
};
