const { Whitelist } = require("../../db/models/auth/whitelistModel");

const getWhitelist = async () => {
  const whitelist = await Whitelist.find({});
  return whitelist;
};

const addToWhitelist = async (body) => {
  const whitelist = new Whitelist({
    email: body.email,
  });
  return whitelist;
};

const updateWhitelist = async (id, body) => {
  const whitelist = await Whitelist.findByIdAndUpdate(id, {
    $set: { email: body.email },
  });
  return whitelist;
};

const deleteFromWhitelist = async (id) => {
  const whitelist = await Whitelist.findByIdAndDelete(id);
  return whitelist;
};

module.exports = {
  getWhitelist,
  addToWhitelist,
  updateWhitelist,
  deleteFromWhitelist,
};
