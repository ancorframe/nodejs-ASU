const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  postHistoryValidation,
  putHistoryValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  createHistoryController,
  getHistoryController,
  updateHistoryController,
} = require("../../controllers/historyControllers");

// routes
router.get("/history", asyncWrapper(getHistoryController));

// admin routes
router.get(
  "/admin/history",
  authMiddleware,
  asyncWrapper(getHistoryController)
);

router.post(
  "/admin/history",
  authMiddleware,
  postHistoryValidation,
  asyncWrapper(createHistoryController)
);

router.put(
  "/admin/history/:id",
  authMiddleware,
  putHistoryValidation,
  asyncWrapper(updateHistoryController)
);

module.exports = router;
