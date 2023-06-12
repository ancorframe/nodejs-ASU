const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  patchSpecialtyValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getSpecialtyController,
  createSpecialtyController,
  updateSpecialtyController,
} = require("../../controllers/specialtyControllers");

// admin routers

router.get(
  "/admin/specialty",
  authMiddleware,
  asyncWrapper(getSpecialtyController)
);

router.post(
  "/admin/specialty",
  authMiddleware,
  asyncWrapper(createSpecialtyController)
);
router.patch(
  "/admin/specialty/:id",
  authMiddleware,
  patchSpecialtyValidation,
  asyncWrapper(updateSpecialtyController)
);

module.exports = router;
