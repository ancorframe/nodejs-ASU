const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

// middleware
const {
  userLoginValidation,
  userRegisterValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { currentMiddleware } = require("../../middleware/currentMiddleware");

// controllers
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  refreshTokenController,
} = require("../../controllers/auth/userControllers");

// routes
router.post(
  "/user/register",
  userRegisterValidation,
  asyncWrapper(registerUserController)
);
router.post(
  "/user/login",
  userLoginValidation,
  asyncWrapper(loginUserController)
);
router.post("/user/logout", authMiddleware, asyncWrapper(logoutUserController));
router.get(
  "/user/current",
  currentMiddleware,
  asyncWrapper(currentUserController)
);
router.get(
  "/user/refresh-token",
  authMiddleware,
  asyncWrapper(refreshTokenController)
);

module.exports = router;
