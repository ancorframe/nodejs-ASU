const Jimp = require("jimp");
const { ErrorConstructor } = require("./errors");

const imageFormatter = (FILE_READ, FILE_DESTINATION) => {
  Jimp.read(FILE_READ, (err, img) => {
    if (err) {
      throw new ErrorConstructor(err);
    }
    img.quality(70);
    img.write(FILE_DESTINATION);
  });
};

module.exports = {
  imageFormatter,
};
