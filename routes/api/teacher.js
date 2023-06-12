const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  postTeacherValidation,
  putTeacherValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");

// controllers
const {
  getTeachersController,
  getTeacherByIdController,
  getTeachersAdminController,
  getTeacherByIdAdminController,
  addTeacherController,
  updateTeacherByIdController,
  deleteTeacherByIdController,
} = require("../../controllers/teacherControllers");
const { uploadMiddleware } = require("../../middleware/uploadMiddleware");

// routers
router.get("/teachers", asyncWrapper(getTeachersController));
router.get("/teachers/:id", asyncWrapper(getTeacherByIdController));

// admin routes
router.get(
  "/admin/teachers",
  authMiddleware,
  asyncWrapper(getTeachersAdminController)
);
router.get(
  "/admin/teachers/:id",
  authMiddleware,
  asyncWrapper(getTeacherByIdAdminController)
);
router.post(
  "/admin/teachers",
  authMiddleware,
  uploadMiddleware.single("image"),
  postTeacherValidation,
  asyncWrapper(addTeacherController)
);
router.delete(
  "/admin/teachers/:id",
  authMiddleware,
  asyncWrapper(deleteTeacherByIdController)
);
router.put(
  "/admin/teachers/:id",
  authMiddleware,
  uploadMiddleware.single("image"),
  putTeacherValidation,
  asyncWrapper(updateTeacherByIdController)
);

module.exports = router;
