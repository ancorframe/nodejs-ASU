const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  postPartnershipValidation,
  putPartnershipValidation,
  postPartnershipDetailValidation,
  putPartnershipDetailValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  uploadMiddleware,
  uploadFields,
} = require("../../middleware/uploadMiddleware");

// controllers
const {
  getPartnershipController,
  getPartnershipByIdController,
  getPartnershipAdminController,
  getPartnershipByIdAdminController,
  addPartnershipController,
  updatePartnershipByIdController,
  deletePartnershipByIdController,
  getPartnershipDetailByIdController,
  addPartnershipDetailController,
  updatePartnershipDetailByIdController,
  deletePartnershipDetailByIdController,
  getPartnershipListByIdAdminController,
} = require("../../controllers/partnershipControllers");

// routes
router.get("/partnership", asyncWrapper(getPartnershipController));
router.get("/partnership/:id", asyncWrapper(getPartnershipByIdController));

// admin routes
router.get("/admin/partnership", asyncWrapper(getPartnershipAdminController));
router.get("/admin/partnership/:id", asyncWrapper(getPartnershipByIdAdminController));
router.get(
  "/admin/partnershipList/:id",
  asyncWrapper(getPartnershipListByIdAdminController)
);
router.get(
  "/admin/partnership/detail/:id",
  authMiddleware,
  asyncWrapper(getPartnershipDetailByIdController)
);

router.post(
  "/admin/partnership",
  authMiddleware,
  uploadMiddleware.single("image"),
  postPartnershipValidation,
  asyncWrapper(addPartnershipController)
);
router.post(
  "/admin/partnership/detail",
  authMiddleware,
  uploadFields,
  postPartnershipDetailValidation,
  asyncWrapper(addPartnershipDetailController)
);

router.delete(
  "/admin/partnership/:id",
  authMiddleware,
  asyncWrapper(deletePartnershipByIdController)
);
router.delete(
  "/admin/partnership/detail/:id",
  authMiddleware,
  asyncWrapper(deletePartnershipDetailByIdController)
);

router.put(
  "/admin/partnership/:id",
  authMiddleware,
  uploadMiddleware.single("image"),
  putPartnershipValidation,
  asyncWrapper(updatePartnershipByIdController)
);

router.put(
  "/admin/partnership/detail/:id",
  authMiddleware,
  uploadFields,
  putPartnershipDetailValidation,
  asyncWrapper(updatePartnershipDetailByIdController)
);
module.exports = router;
