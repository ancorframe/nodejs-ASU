const { Subgroup } = require("../db/models/subgroupModel");

const getSubgroup = async () => {
  const subgroup = await Subgroup.findOne({
    unique: "unique",
  });
  return subgroup;
};

const createSubgroup = async (user) => {
  const subgroup = new Subgroup({
    data: { subgroup: [] },
    updatedBy: user._id,
  });
  await subgroup.save();
  return subgroup;
};

const updateSubgroup = async (user, body, id) => {
  const subgroup = await Subgroup.findByIdAndUpdate(id, {
    $push: { "data.subgroup": body },
  });
  await subgroup.save();
  return subgroup;
};

module.exports = {
  getSubgroup,
  createSubgroup,
  updateSubgroup,
};
