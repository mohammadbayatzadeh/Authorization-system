const notFoundError = (req, res, next) => {
  return res.send({
    status: 404,
    message: "not Found any " + req.url + " route",
  });
};

const ErrorHandler = (err, req, res, next) => {
  const status = err?.status || err?.statusCode || 500;
  const message = err?.message || "internal server error";
  return res.send({
    status: status,
    message: message,
  });
};

module.exports = {
  notFoundError,
  ErrorHandler,
};
