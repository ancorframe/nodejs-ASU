const multer = require("multer");
const { storage } = require("../helpers/storageConfiguration");

const uploadMiddleware = multer({ storage });

const uploadFields = uploadMiddleware.fields([
  { name: "image", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);


module.exports = {
  uploadMiddleware,
  uploadFields,
};
