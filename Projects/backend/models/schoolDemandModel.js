const mongoose = require("mongoose");

const demandSchoolSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter School Name"],
  },
  address: {
    type: String,
    required: [true, "Please Enter School Name"],
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  teachers: [
    {
      name: {
        type: String,
        required: [true, "please enter teaher name"],
      },
      phone: {
        type: String,
        required: [true, "please enter teaher phone"],
      },
    },
  ],
  type: {
    type: String,
    rrequired: [true, "Please select School Type"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "Please Enter School School phone number"],
  },
  maxStudent: {
    type: Number,
    required: [
      true,
      "please provide the max number of student that the school can hold",
    ],
  },
  // doc: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // system: {
  //   type: String,
  //   required: [true, "Please choose School system of teaching"],
  // },
  demandStatus: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SchoolDemand", demandSchoolSchema);
