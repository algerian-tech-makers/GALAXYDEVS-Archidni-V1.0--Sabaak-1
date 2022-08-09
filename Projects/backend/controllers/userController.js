const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");

// Register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  // const myIdCard = await cloudinary.v2.uploader.upload(req.body.identity, {
  //   folder: "cardsIds",
  //   width: 150,
  //   crop: "scale",
  // });
  const { name, userId, password, phone, address } = req.body;
  const user = await User.create({
    name,
    userId,
    password,
    phone,
    address,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    // identity: {
    //   public_id: myIdCard.public_id,
    //   url: myIdCard.secure_url,
    // },
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { userId, password } = req.body;

  //check if user enter email and password
  if (!userId || !password) {
    return next(new errorHandler("Please enter User ID or password", 401));
  }

  const user = await User.findOne({ userId }).select("+password");
  if (!user) {
    return next(new errorHandler("Invalid User ID or Password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new errorHandler("Invalid User ID or Password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  try {
    user = await User.findById(req.user.id);
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.address = req.body.address;
    if (req.body.avatar !== "") {
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new errorHandler(error.message));
  }
});

//Get All Users (admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single Users --admin
exports.getSingleUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new errorHandler(`User does not exist with Id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (user.userId !== req.body.userId) {
      return next(
        new errorHandler(
          `the user ID ${req.body.userId}does not match the right user`,
          400
        )
      );
    }
    user.role = req.body.role;
    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new errorHandler(error.message));
  }
});

//Delete User --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new errorHandler(`user doesn't exist with Id : ${req.params.id}`, 400)
    );
  }
  const imageId = user.avatar.public_id;
  const identityId = user.identity.public_id;

  await cloudinary.v2.uploader.destroy(imageId);
  await cloudinary.v2.uploader.destroy(identityId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
