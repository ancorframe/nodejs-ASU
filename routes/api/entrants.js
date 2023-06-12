const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  postEntrantsValidation,
  putEntrantsValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getEntrantsController,
  getEntrantsAdminController,
  getEntrantsByIdAdminController,
  createEntrantsController,
  updateEntrantsController,
} = require("../../controllers/entrantsControllers");

// routes

router.get("/entrants", asyncWrapper(getEntrantsController));

// admin routes

router.get(
  "/admin/entrants/",
  authMiddleware,
  asyncWrapper(getEntrantsAdminController)
);
router.get(
  "/admin/entrants/:id",
  authMiddleware,
  asyncWrapper(getEntrantsByIdAdminController)
);
router.post(
  "/admin/entrants",
  authMiddleware,
  postEntrantsValidation,
  asyncWrapper(createEntrantsController)
);
router.put(
  "/admin/entrants/:id",
  authMiddleware,
  putEntrantsValidation,
  asyncWrapper(updateEntrantsController)
);

module.exports = router;
