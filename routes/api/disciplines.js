const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  postDisciplinesValidation,
  putDisciplinesValidation,
} = require("../../middleware/validationMiddleware");

// controllers
const {
  getDisciplinesController,
  getDisciplinesFilterController,
  createDisciplinesController,
  getDisciplinesAdminController,
  updateDisciplinesController,
  deleteDisciplinesController,
  getDisciplinesByIdAdminController,
} = require("../../controllers/disciplinesControllers");

// routers

router.get("/disciplines", asyncWrapper(getDisciplinesController));
router.get("/disciplines/filter", asyncWrapper(getDisciplinesFilterController));
// admin routers

router.get(
  "/admin/disciplines",
  authMiddleware,
  asyncWrapper(getDisciplinesAdminController)
);
router.get(
  "/admin/disciplines/:id",
  authMiddleware,
  asyncWrapper(getDisciplinesByIdAdminController)
);
router.post(
  "/admin/disciplines",
  authMiddleware,
  postDisciplinesValidation,
  asyncWrapper(createDisciplinesController)
);
router.put(
  "/admin/disciplines/:id",
  authMiddleware,
  putDisciplinesValidation,
  asyncWrapper(updateDisciplinesController)
);
router.delete(
  "/admin/disciplines/:id",
  authMiddleware,
  asyncWrapper(deleteDisciplinesController)
);

module.exports = router;
