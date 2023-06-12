const express = require("express");
const router = express.Router();

// middleware
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  putHomeValidation,
  postHomeValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getHomeController,
  updateHomeController,
  createHomeController,
} = require("../../controllers/homeControllers");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { uploadMiddleware } = require("../../middleware/uploadMiddleware");

// router
router.get("/home", asyncWrapper(getHomeController));

// admin router
router.get("/admin/home", authMiddleware, asyncWrapper(getHomeController));

router.put(
  "/admin/home/:id",
  authMiddleware,
  uploadMiddleware.single("image"),
  putHomeValidation,
  asyncWrapper(updateHomeController)
);

router.post(
  "/admin/home",
  authMiddleware,
  postHomeValidation,
  createHomeController
);

module.exports = router;
