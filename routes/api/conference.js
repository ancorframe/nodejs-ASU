const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  postConferenceValidation,
  putConferenceValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { uploadMiddleware } = require("../../middleware/uploadMiddleware");

// controllers
const {
  getConferencesController,
  getConferenceByIdController,
  addConferenceController,
  updateConferenceByIdController,
  deleteConferenceByIdController,
  getConferencesAdminController,
  getConferenceByIdAdminController,
} = require("../../controllers/conferenceControllers");

// routers
router.get("/conference", asyncWrapper(getConferencesController));
router.get("/conference/:id", asyncWrapper(getConferenceByIdController));

// admin routers
router.get(
  "/admin/conference",
  authMiddleware,
  asyncWrapper(getConferencesAdminController)
);
router.get(
  "/admin/conference/:id",
  authMiddleware,
  asyncWrapper(getConferenceByIdAdminController)
);
router.post(
  "/admin/conference",
  authMiddleware,
  uploadMiddleware.single("image"),
  postConferenceValidation,
  // upload img middleware
  asyncWrapper(addConferenceController)
);
router.delete(
  "/admin/conference/:id",
  authMiddleware,
  asyncWrapper(deleteConferenceByIdController)
);
router.put(
  "/admin/conference/:id",
  authMiddleware,
  uploadMiddleware.single("image"),
  putConferenceValidation,
  asyncWrapper(updateConferenceByIdController)
);

module.exports = router;
