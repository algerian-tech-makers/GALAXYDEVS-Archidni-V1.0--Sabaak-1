const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
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
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  teachers: [
    {
      name: {
        type: String,
        required: [true, "Please enter the name"],
      },
      id: {
        type: String,
        required: [true, "Please enter the id"],
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
      specialty: {
        type: String,
        required: [true, "Please enter the specialty"],
      },
      experience: {
        type: Number,
        reuse: true,
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
  descision: {
    type: String,
    default: "0",
  },
  status: {
    type: String,
    default: "open",
  },
  // doc: {
  //   public_id: {
  //     type: String,
  //     // required: true,
  //   },
  //   url: {
  //     type: String,
  //     // required: true,
  //   },
  // },
  lan: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  studentRequests: [
    {
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
      stdReqImg: {
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
    },
  ],
  students: [
    {
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
      stdImg: {
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
    },
  ],
});

module.exports = mongoose.model("School", schoolSchema);
