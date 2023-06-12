const { ErrorConstructor } = require("../../helpers/errors");
const {
  getWhitelist,
  addToWhitelist,
  updateWhitelist,
  deleteFromWhitelist,
} = require("../../services/auth/whiteListServices");

const getWhitelistController = async (req, res) => {
  try {
    const whitelist = await getWhitelist();
    res.json({ whitelist });
  } catch (error) {
    throw new ErrorConstructor(409, "Unauthorized");
  }
};

const addToWhitelistController = async (req, res) => {
  const { body } = req;
  try {
    await addToWhitelist(body);
    res.json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(409, "Unauthorized");
  }
};

const updateWhitelistController = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    await updateWhitelist(id, body);
    res.json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(409, "Unauthorized");
  }
};

const deleteFromWhitelistController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteFromWhitelist(id);
    res.json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(409, "Unauthorized");
  }
};

module.exports = {
  getWhitelistController,
  addToWhitelistController,
  updateWhitelistController,
  deleteFromWhitelistController,
};
