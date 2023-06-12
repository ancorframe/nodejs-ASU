const { Group } = require("../db/models/groupModel");

const getGroup = async () => {
  const group = await Group.findOne({
    unique: "unique",
  });
  return group;
};

const createGroup = async (user) => {
  const group = new Group({
    data: { group: [] },
    updatedBy: user._id,
  });
  await group.save();
  return group;
};

const updateGroup = async (user, body, id) => {
  const group = await Group.findByIdAndUpdate(id, {
    $push: { "data.group":body },
  });
  await group.save();
  return group;
};

module.exports = {
  getGroup,
  createGroup,
  updateGroup,
};
