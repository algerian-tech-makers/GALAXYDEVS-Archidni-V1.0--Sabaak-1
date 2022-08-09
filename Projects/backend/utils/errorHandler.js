class ErrorHandeler extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandeler;
