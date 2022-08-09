const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error (Cast to ObjectId failed)
  if (err.name === "CastError") {
    const message = `Resource Not Found, Invalid ${err.path}`;
    err = new errorHandler(message, 400);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate Data, This ${Object.keys(
      err.keyValue
    )} is used already`;
    err = new errorHandler(message, 400);
  }

  // wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `JSON web Token is Invalid, try again`;
    err = new errorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `JSON web Token is Expired, try again`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
