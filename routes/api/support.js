const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  postSupportValidation,
  putSupportValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getSupportController,
  getSupportAdminController,
  createSupportController,
  updateSupportController,
} = require("../../controllers/supportControllers");

// routes
router.get("/support", asyncWrapper(getSupportController));

// admin routes

router.get(
  "/admin/support",
  authMiddleware,
  asyncWrapper(getSupportAdminController)
);
router.post(
  "/admin/support",
  authMiddleware,
  postSupportValidation,
  asyncWrapper(createSupportController)
);
router.put(
  "/admin/support/:id",
  authMiddleware,
  putSupportValidation,
  asyncWrapper(updateSupportController)
);

module.exports = router;
