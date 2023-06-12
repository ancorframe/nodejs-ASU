const { Specialty } = require("../db/models/specialtyModel");

const getSpecialty = async () => {
  const specialty = await Specialty.findOne({
    unique: "unique",
  });
  return specialty;
};

const createSpecialty = async (user) => {
  const specialty = new Specialty({
    data: { specialty: [] },
    updatedBy: user._id,
  });
  await specialty.save();
  return specialty;
};

const updateSpecialty = async (user, body, id) => {
  const specialty = await Specialty.findByIdAndUpdate(id, {
    $push: { "data.specialty": body },
  });
  await specialty.save();
  return specialty;
};

module.exports = {
  getSpecialty,
  createSpecialty,
  updateSpecialty,
};
