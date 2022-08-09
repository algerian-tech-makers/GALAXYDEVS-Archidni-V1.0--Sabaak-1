const express = require("express");
const {
  getAllSchools,
  createSchool,
  updateSchool,
  deleteSchool,
  schoolDetails,
  createSchoolTecher,
  createStudentRequest,
  deleteStudentRequest,
  getStudentRequests,
  createStudent,
  getAllStudent,
  deleteSingleStudent,
} = require("../controllers/schoolController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * /schools:
 *  get:
 *    description: get all schools
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router.route("/schools").get(getAllSchools);

// Routes
/**
 * @swagger
 * /schools/new:
 *  post:
 *    description: Create a new school
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/schools/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createSchool);
/**
 * @swagger
 * /schools/:id:
 *  get:
 *    description: get school details
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
/**
 * @swagger
 * /schools/:id:
 *  put:
 *    description: Update school
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
/**
 * @swagger
 * /schools/:id:
 *  delete:
 *    description: delete school
 *    responses:
 *      '200':
 *        description: A successful response
 *
 */
router.route("/schools/:id").get(schoolDetails);
// router.route("/schools/:id");

router
  .route("/admin/schools/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSchool)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSchool);

/**
 * @swagger
 * /teacher/new:
 *  put:
 *    description: Create and update teacher
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */

router
  .route("/teacher/new")
  .put(isAuthenticatedUser, authorizeRoles("responsable"), createSchoolTecher);
/**
 * @swagger
 * /student-request/new:
 *  put:
 *    description: Create and update student request
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router.route("/student-request/new").put(createStudentRequest);

/**
 * @swagger
 * /student-request:
 *  get:
 *    description: get all sudent requests
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
/**
 * @swagger
 * /student-request:
 *  delete:
 *    description: delete student request
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/student-request")
  .get(isAuthenticatedUser, authorizeRoles("responsable"), getStudentRequests)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("responsable"),
    deleteStudentRequest
  );
/**
 * @swagger
 * /student-request:
 *  put:
 *    description: create student
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/student/new")
  .put(isAuthenticatedUser, authorizeRoles("responsable"), createStudent);

/**
 * @swagger
 * /student:
 *  get:
 *    description: get all registred students
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
/**
 * @swagger
 * /student:
 *  delete:
 *    description: delete student
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/student")
  .get(isAuthenticatedUser, authorizeRoles("responsable"), getAllStudent)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("responsable"),
    deleteSingleStudent
  );

module.exports = router;
