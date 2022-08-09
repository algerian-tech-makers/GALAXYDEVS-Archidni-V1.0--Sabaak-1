const mongoose = require("mongoose");

const connectDatabasa = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabasa;
