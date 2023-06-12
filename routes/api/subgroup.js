const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  patchSubgroupValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getSubgroupController,
  createSubgroupController,
  updateSubgroupController,
} = require("../../controllers/subgroupControllers");

// admin routers

router.get(
  "/admin/subgroup",
  authMiddleware,
  asyncWrapper(getSubgroupController)
);

router.post(
  "/admin/subgroup",
  authMiddleware,
  asyncWrapper(createSubgroupController)
);
router.patch(
  "/admin/subgroup/:id",
  authMiddleware,
  patchSubgroupValidation,
  asyncWrapper(updateSubgroupController)
);

module.exports = router;
