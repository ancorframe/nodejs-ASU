const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const { uploadMiddleware } = require("../../middleware/uploadMiddleware");
const {
  postNewsValidation,
  putNewsValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getNewsController,
  getNewsByIdController,
  getNewsAdminController,
  getNewsByIdAdminController,
  addNewsController,
  updateNewsByIdController,
  deleteNewsByIdController,
} = require("../../controllers/newsControllers");

// router

router.get("/news", asyncWrapper(getNewsController));
router.get("/news/:id", asyncWrapper(getNewsByIdController));

// admin router

router.get("/admin/news", authMiddleware, asyncWrapper(getNewsAdminController));
router.get(
  "/admin/news/:id",
  authMiddleware,
  asyncWrapper(getNewsByIdAdminController)
);
router.post(
  "/admin/news",
  authMiddleware,
  uploadMiddleware.single("image"),
  postNewsValidation,
  asyncWrapper(addNewsController)
);
router.delete(
  "/admin/news/:id",
  authMiddleware,
  asyncWrapper(deleteNewsByIdController)
);
router.put(
  "/admin/news/:id",
  authMiddleware,
  uploadMiddleware.single("image"),
  putNewsValidation,
  asyncWrapper(updateNewsByIdController)
);

module.exports = router;
