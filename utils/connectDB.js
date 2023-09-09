const dotenv = require("dotenv");
const { connections, default: mongoose } = require("mongoose");

dotenv.config();

const connectDB = async () => {
  if (connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to db");
};

module.exports = {
  connectDB,
};
