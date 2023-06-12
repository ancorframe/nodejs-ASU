const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  postLiteratureValidation,
  putLiteratureValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { uploadMiddleware } = require("../../middleware/uploadMiddleware");

// controllers
const {
  getLiteratureController,
  getLiteratureFilterController,
  getLiteratureAdminController,
  getLiteratureByIdController,
  addLiteratureController,
  updateLiteratureByIdController,
  deleteLiteratureByIdController,
} = require("../../controllers/literatureControllers");

// routes
router.get("/literature", asyncWrapper(getLiteratureController));
router.get("/literature/filter", asyncWrapper(getLiteratureFilterController));
// admin routes

router.get(
  "/admin/literature",
  authMiddleware,
  asyncWrapper(getLiteratureAdminController)
);
router.get(
  "/admin/literature/:id",
  authMiddleware,
  asyncWrapper(getLiteratureByIdController)
);
router.post(
  "/admin/literature",
  authMiddleware,
  uploadMiddleware.single("image"),
  postLiteratureValidation,
  asyncWrapper(addLiteratureController)
);
router.delete(
  "/admin/literature/:id",
  authMiddleware,
  asyncWrapper(deleteLiteratureByIdController)
);
router.put(
  "/admin/literature/:id",
  authMiddleware,
  uploadMiddleware.single("image"),
  putLiteratureValidation,
  asyncWrapper(updateLiteratureByIdController)
);

module.exports = router;
