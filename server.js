const express = require("express");
const { notFoundError, ErrorHandler } = require("./utils/errorHandling");
const { allRoutes } = require("./routers/index.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);
app.use(notFoundError);
app.use(ErrorHandler);

app.listen(3000, () => {
  console.log("server run on port 300 http://localhost:3000");
});
