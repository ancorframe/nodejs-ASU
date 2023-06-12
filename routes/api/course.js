const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  patchCourseValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getCourseController,
  createCourseController,
  updateCourseController,
} = require("../../controllers/courseControllers");

// admin routers

router.get("/admin/course", authMiddleware, asyncWrapper(getCourseController));

router.post(
  "/admin/course",
  authMiddleware,

  asyncWrapper(createCourseController)
);
router.patch(
  "/admin/course/:id",
  authMiddleware,
  patchCourseValidation,
  asyncWrapper(updateCourseController)
);

module.exports = router;
