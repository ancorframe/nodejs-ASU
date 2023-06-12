const express = require("express");
const router = express.Router();
const path = require("path");
const {
  addImageController,
} = require("../../controllers/imageController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { uploadMiddleware } = require("../../middleware/uploadMiddleware");

const FILE_DIR = path.resolve("./dist");

router.use("/", express.static(FILE_DIR));

router.post(
  "/upload",
  uploadMiddleware.single('image'),
  asyncWrapper(addImageController)
);

module.exports = router;
