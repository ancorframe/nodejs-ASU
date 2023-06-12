const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  postResearchValidation,
  putResearchValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");

// controllers
const {
  getResearchController,
  getResearchAdminController,
  addResearchController,
  updateResearchByIdController,
} = require("../../controllers/researchControllers");

// routers
router.get("/research", asyncWrapper(getResearchController));

// admin routers
router.get("/admin/research", authMiddleware, asyncWrapper(getResearchAdminController));
router.post(
  "/admin/research",
  authMiddleware,
  postResearchValidation,
  asyncWrapper(addResearchController)
);
router.put(
  "/admin/research/:id",
  authMiddleware,
  putResearchValidation,
  asyncWrapper(updateResearchByIdController)
);

module.exports = router;
