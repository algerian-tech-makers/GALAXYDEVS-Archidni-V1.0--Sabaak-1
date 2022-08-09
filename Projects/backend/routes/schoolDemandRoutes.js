const express = require("express");
const {
  createSchoolOrder,
  getAllSchoolsOrder,
  deleteSchoolOrder,
  schoolOrderDetails,
} = require("../controllers/schoolDemandController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
/**
 * @swagger
 * /school-demands:
 *  get:
 *    description: all orders to create school
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/school-demands")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllSchoolsOrder);

/**
 * @swagger
 * /school-demand/new:
 *  post:
 *    description: create school order
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router.route("/school-demand/new").post(createSchoolOrder);
/**
 * @swagger
 * /school-demands/:id:
 *  get:
 *    description: create school order
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
/**
 * @swagger
 * /school-demands/:id:
 *  delete:
 *    description: create school order
 *    responses:
 *      '200':
 *
 *        description: A successful response
 */
router
  .route("/school-demands/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), schoolOrderDetails)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSchoolOrder);

module.exports = router;
