const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter first Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter last Name"],
  },

  birthday: {
    type: String,
    required: [true, "Please enter the birthday"],
  },
  address: {
    type: String,
    required: [true, "Please enter the address"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter the phone"],
  },
  gender: {
    type: String,
    required: [true, "Please select the gender"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  school: {
    type: mongoose.Schema.ObjectId,
    ref: "School",
    required: true,
  },
});

module.exports = mongoose.model("Request", requestSchema);
