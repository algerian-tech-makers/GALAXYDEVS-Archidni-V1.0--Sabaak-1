const SchoolDemand = require("../models/schoolDemandModel");
const errorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");

//Create open school order
exports.createSchoolOrder = catchAsyncError(async (req, res, next) => {
  const schoolImg = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "schoolDemandLogo",
    width: 150,
    crop: "scale",
  });
  // const schoolDoc = await cloudinary.v2.uploader.upload(req.body.doc, {
  //   folder: "schoolDemandDoc",
  //   width: 150,
  //   crop: "scale",
  // });

  const image = {
    public_id: schoolImg.public_id,
    url: schoolImg.secure_url,
  };
  // const doc = {
  //   public_id: schoolDoc.public_id,
  //   url: schoolDoc.secure_url,
  // };
  // req.body.doc = doc;
  req.body.image = image;
  const school = await SchoolDemand.create(req.body);

  res.status(200).json({
    success: true,
    school,
  });
});

//Get All Schools demand
exports.getAllSchoolsOrder = catchAsyncError(async (req, res, next) => {
  const resultParPage = 10;
  const schoolsCount = await SchoolDemand.countDocuments();
  const apiFeature = new ApiFeatures(SchoolDemand.find(), req.query)
    .search()
    .filter()
    .pagination(resultParPage);

  let schools = await apiFeature.query;
  let filteredSchoolsCount = schools.length;
  res.status(200).json({
    success: true,
    schools,
    schoolsCount,
    resultParPage,
    filteredSchoolsCount,
  });
});

//Delete School Order --Admin
exports.deleteSchoolOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let school = await SchoolDemand.findById(id);
  if (!school) {
    return next(new errorHandler("school not found", 404));
  }
  // const imageId = school.image.public_id;
  // const docId = school.doc.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);
  // await cloudinary.v2.uploader.destroy(docId);
  await school.remove();
  res.status(200).json({
    success: true,
    message: "school deleted successfully",
  });
});

//Get School order Details --admin
exports.schoolOrderDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const school = await SchoolDemand.findById(id);

  res.status(200).json({
    success: true,
    school,
  });
});
