const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  postWhiteListValidation,
  putWhiteListValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");

// controllers
const {
  getWhitelistController,
  addToWhitelistController,
  updateWhitelistController,
  deleteFromWhitelistController,
} = require("../../controllers/auth/whiteListControllers");

// routes
router.post(
  "/",
  postWhiteListValidation,
  asyncWrapper(addToWhitelistController)
);
router.put(
  "/:id",
  putWhiteListValidation,
  asyncWrapper(updateWhitelistController)
);
router.delete(
  "/:id",
  authMiddleware,
  asyncWrapper(deleteFromWhitelistController)
);
router.get(
  "/",
  authMiddleware,
  asyncWrapper(getWhitelistController)
);

module.exports = router;
