const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  postScheduleValidation,
  putScheduleValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");

// controllers
const {
  getFilterController,
  getSchedulesByFilterController,
  getSchedulesController,
  getScheduleByIdController,
  addScheduleController,
  updateScheduleByIdController,
  deleteScheduleByIdController,
} = require("../../controllers/scheduleControllers");

// routers
router.get("/schedule/filter", asyncWrapper(getFilterController));
router.get("/schedule", asyncWrapper(getSchedulesByFilterController));

// admin routers
router.get(
  "/admin/schedule",
  authMiddleware,
  asyncWrapper(getSchedulesController)
);
router.get(
  "/admin/schedule/:id",
  authMiddleware,
  asyncWrapper(getScheduleByIdController)
);
router.post(
  "/admin/schedule",
  authMiddleware,
  postScheduleValidation,
  asyncWrapper(addScheduleController)
);
router.delete(
  "/admin/schedule/:id",
  authMiddleware,
  asyncWrapper(deleteScheduleByIdController)
);
router.put(
  "/admin/schedule/:id",
  authMiddleware,
  putScheduleValidation,
  asyncWrapper(updateScheduleByIdController)
);

module.exports = router;
