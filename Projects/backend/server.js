const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("../backend/config/db");
const cloudinary = require("cloudinary");

//config
dotenv.config({ path: "./config/config.env" });

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shuting down the surver due to uncaught exception");
  process.exit(1);
});

// Connect to Database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// Unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shuting down the surver due to unhadle promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
