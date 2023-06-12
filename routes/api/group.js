const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  patchGroupValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getGroupController,
  createGroupController,
  updateGroupController,
} = require("../../controllers/groupControllers");


// admin routers

router.get(
  "/admin/group",
  authMiddleware,
  asyncWrapper(getGroupController)
);

router.post(
  "/admin/group",
  authMiddleware,
  asyncWrapper(createGroupController)
);
router.patch(
  "/admin/group/:id",
  authMiddleware,
  patchGroupValidation,
  asyncWrapper(updateGroupController)
);

module.exports = router;
