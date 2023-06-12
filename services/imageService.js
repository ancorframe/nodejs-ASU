const { imageSaver } = require("../helpers/imageSaver");

const addImage = async (req, filename) => {
  const image = await imageSaver(filename);
  return image;
};

module.exports = { addImage };
