const path = require("path");
const { imageFormatter } = require("./imageFormatter");
const fs = require("fs").promises;
const SERVER_URL = process.env.SERVER_URL;

 const imageSaver = async (filename) => {
  const FILE_DESTINATION = path.resolve(`./dist/${filename}`);
  const FILE_READ = path.resolve(`./tmp/${filename}`);
  imageFormatter(FILE_READ, FILE_DESTINATION);
  const imageURL = `${SERVER_URL}/api/${filename}`;
  await fs.unlink(FILE_READ);
  return imageURL;
};
module.exports={imageSaver}