const login = (req, res, nexxt) => {
  res.send("login system");
};

const register = (req, res, nexxt) => {
  res.send("register system");
};

module.exports = {
  login,
  register,
};
