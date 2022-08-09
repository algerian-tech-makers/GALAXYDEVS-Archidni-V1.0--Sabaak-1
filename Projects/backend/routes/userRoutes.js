const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateProfile,
  getAllUsers,
  getSingleUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
/**
 * @swagger
 * /register:
 *  post:
 *    description: register student
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/register")
  .post(isAuthenticatedUser, authorizeRoles("admin"), registerUser);
/**
 * @swagger
 * /login:
 *  post:
 *    description: login user
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router.route("/login").post(loginUser);
/**
 * @swagger
 * /logout:
 *  Get:
 *    description: logout user
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router.route("/logout").get(logoutUser);
/**
 * @swagger
 * /me:
 *  put:
 *    description: get user details
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router.route("/me").get(isAuthenticatedUser, getUserDetails);
/**
 * @swagger
 * /me/update:
 *  put:
 *    description: update user details
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
/**
 * @swagger
 * /admin/users:
 *  Get:
 *    description: get all users
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
/**
 * @swagger
 * /admin/user/:id:
 *  Get:
 *    description: get single user
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
/**
 * @swagger
 * /admin/user/:id:
 *  put:
 *    description: update user role
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
/**
 * @swagger
 * /admin/user/:id:
 *  Delete:
 *    description: delete user
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUsers)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
