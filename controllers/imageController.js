const { BadRequest } = require("../helpers/errors");
const { addImage } = require("../services/imageService");

const addImageController = async (req, res) => {
  const filename = req.file.filename;
  if (!filename) {
    throw new BadRequest("missing required field ");
  }
  try {
    const uploadedImage = await addImage(req, filename);
 
    res.json({
      data: { link:uploadedImage }
    });
  } catch (error) {
    throw new BadRequest("Something wrong( Try again");
  }
};

module.exports = {
  addImageController,
};
