const School = require("../models/schoolModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Create School --Admin

exports.createSchool = catchAsyncError(async (req, res, next) => {
  const schoolImg = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "schoolsImg",
    width: 150,
    crop: "scale",
  });
  // const schoolDoc = await cloudinary.v2.uploader.upload(req.body.doc, {
  //   folder: "schoolsDoc",
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
  req.body.user = req.user.id;
  const school = await School.create(req.body);

  res.status(200).json({
    success: true,
    school,
  });
});

//Get All Schools
exports.getAllSchools = catchAsyncError(async (req, res, next) => {
  const resultParPage = 100;
  const schoolsCount = await School.countDocuments();
  const apiFeature = new ApiFeatures(School.find(), req.query)
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

//Update School --Admin
exports.updateSchool = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.user = req.user.id;

  let school = await School.findById(id);
  if (!school) {
    return next(new errorHandler("School not found", 404));
  }
  if (req.body.image !== undefined) {
    const imageId = school.image.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }
  const schoolImg = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "schoolsImg",
    width: 150,
    crop: "scale",
  });

  const image = {
    public_id: schoolImg.public_id,
    url: schoolImg.secure_url,
  };

  // if (req.body.doc !== undefined) {
  //   const docId = school.doc.public_id;
  //   await cloudinary.v2.uploader.destroy(docId);
  // }
  // const schoolDoc = await cloudinary.v2.uploader.upload(req.body.doc, {
  //   folder: "schoolsDoc",
  //   width: 150,
  //   crop: "scale",
  // });
  // const doc = {
  //   public_id: schoolDoc.public_id,
  //   url: schoolDoc.secure_url,
  // };
  req.body.image = image;
  // req.body.doc = doc;
  school = await School.findOneAndUpdate(id, { ...req.body });

  // await user.save();
  res.status(200).json({
    success: true,
    school,
  });
});

//Delete School --Admin
exports.deleteSchool = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let school = await School.findById(id);
  if (!school) {
    return next(new errorHandler("school not found", 404));
  }
  // const imageId = await school.image.public_id;
  // const docId = await school.doc.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);
  // await cloudinary.v2.uploader.destroy(docId);
  await school.remove();
  res.status(200).json({
    success: true,
    message: "school deleted successfully",
  });
});

//Get School Details
exports.schoolDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const school = await School.findById(id);

  res.status(200).json({
    success: true,
    school,
  });
});

//Create school Teacher
exports.createSchoolTecher = catchAsyncError(async (req, res, next) => {
  const {
    name,
    id,
    birthday,
    address,
    email,
    phone,
    specialty,
    experience,
    schoolId,
  } = req.body;

  const teacher = {
    name,
    id,
    birthday,
    address,
    email,
    phone,
    specialty,
    experience,
  };

  const school = await School.findById(schoolId);

  const isAddedTeacher = school.teachers.find(
    (teacher) => teacher.id === req.body.id
  );

  if (isAddedTeacher) {
    school.teachers.forEach((teacher) => {
      if (teacher.id.toString() === req.body.id.toString())
        (teacher.name = name),
          (teacher.id = id),
          (teacher.birthday = birthday),
          (teacher.address = address),
          (teacher.email = email),
          (teacher.phone = phone),
          (teacher.specialty = specialty),
          (teacher.experience = experience);
    });
  } else {
    school.teachers.push(teacher);
  }

  await school.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Create student request  --student
exports.createStudentRequest = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    birthday,
    address,
    email,
    phone,
    gender,
    stdReqImg,
    schoolId,
  } = req.body;
  const student = {
    firstName,
    lastName,
    birthday,
    address,
    email,
    phone,
    gender,
    stdReqImg,
  };
  const school = await School.findById(schoolId);
  const isAddedRequest = await school.studentRequests.find(
    (std) => std.email === req.body.email
  );

  if (isAddedRequest) {
    school.studentRequests.forEach((std) => {
      if (std.email === req.body.email) {
        (student.firstName = firstName),
          (student.lastName = lastName),
          (student.birthday = birthday),
          (student.address = address),
          (student.email = email),
          (student.phone = phone),
          (student.gender = gender);
      }
    });
    const imageId = isAddedRequest.stdReqImg.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const requestImg = await cloudinary.v2.uploader.upload(req.body.stdReqImg, {
      folder: "stdImages",
      width: 150,
      crop: "scale",
    });

    const reqImg = {
      public_id: requestImg.public_id,
      url: requestImg.secure_url,
    };
    student.stdReqImg = reqImg;
  } else {
    const requestImg = await cloudinary.v2.uploader.upload(req.body.stdReqImg, {
      folder: "studentRequestImgs",
      width: 150,
      crop: "scale",
    });

    const reqImg = {
      public_id: requestImg.public_id,
      url: requestImg.secure_url,
    };
    student.stdReqImg = reqImg;
    school.studentRequests.push(student);
  }

  await school.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get All Student Request Of single school
exports.getStudentRequests = catchAsyncError(async (req, res, next) => {
  const school = await School.findById(req.query.id);
  if (!school) {
    return next(new errorHandler("School Not Found", 404));
  }
  res.status(200).json({
    success: true,
    studentRequests: school.studentRequests,
  });
});

//Delete Student Request
exports.deleteStudentRequest = catchAsyncError(async (req, res, next) => {
  const school = await School.findById(req.query.schoolId);
  if (!school) {
    return next(new errorHandler("school Not Found", 404));
  }
  let imgId;
  const img = school.studentRequests.filter((std) => {
    std._id.toString() === req.query.id.toString();
    imgId = std;
  });
  const imageId = imgId.stdReqImg.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  school.studentRequests = await school.studentRequests.filter(
    (std) => std._id.toString() !== req.query.id.toString()
  );

  await school.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "request deleted successfully",
  });
});

//Create student request  --student
exports.createStudent = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    birthday,
    address,
    email,
    phone,
    gender,
    stdImg,
    schoolId,
  } = req.body;
  const student = {
    firstName,
    lastName,
    birthday,
    address,
    email,
    phone,
    gender,
    stdImg,
  };
  const school = await School.findById(schoolId);
  const isAddedRequest = await school.students.find(
    (std) => std.email === req.body.email
  );

  if (isAddedRequest) {
    school.students.forEach((std) => {
      if (std.email === req.body.email) {
        (student.firstName = firstName),
          (student.lastName = lastName),
          (student.birthday = birthday),
          (student.address = address),
          (student.email = email),
          (student.phone = phone),
          (student.gender = gender);
      }
    });
    const imageId = isAddedRequest.stdImg.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const requestImg = await cloudinary.v2.uploader.upload(req.body.stdImg, {
      folder: "stdImages",
      width: 150,
      crop: "scale",
    });

    const reqImg = {
      public_id: requestImg.public_id,
      url: requestImg.secure_url,
    };
    student.stdImg = reqImg;
  } else {
    const requestImg = await cloudinary.v2.uploader.upload(req.body.stdImg, {
      folder: "stdImages",
      width: 150,
      crop: "scale",
    });

    const reqImg = {
      public_id: requestImg.public_id,
      url: requestImg.secure_url,
    };
    student.stdImg = reqImg;
    school.students.push(student);
  }

  await school.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get All Student Request Of single school
exports.getAllStudent = catchAsyncError(async (req, res, next) => {
  const school = await School.findById(req.query.id);
  if (!school) {
    return next(new errorHandler("School Not Found", 404));
  }
  res.status(200).json({
    success: true,
    studentRequests: school.students,
  });
});

//Delete Student
exports.deleteSingleStudent = catchAsyncError(async (req, res, next) => {
  const school = await School.findById(req.query.schoolId);
  if (!school) {
    return next(new errorHandler("school Not Found", 404));
  }
  let stdImgId;
  const img = school.students.filter((student) => {
    student._id.toString() === req.query.id.toString();
    stdImgId = student;
  });
  const imageId = stdImgId.stdImg.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  school.students = await school.students.filter(
    (student) => student._id.toString() !== req.query.id.toString()
  );

  await school.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "request deleted successfully",
  });
});
