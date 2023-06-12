const { Disciplines } = require("../db/models/disciplinesModel");

const getDisciplines = async (course, specialty) => {
    const cour = !course ? {} : { "data.course.value": course };
    const spec = !specialty ? {} : { "data.specialty.value": specialty };
  const disciplines = await Disciplines.find(
    { ...cour, ...spec },
    { data: 1 }
  ).sort({
    createdAt: -1,
  });
  return disciplines;
};

const getDisciplinesFilter = async () => {

  const course = await Disciplines.distinct("data.course");
  const specialty = await Disciplines.distinct("data.specialty");

  return { course, specialty };
};

// admin

const getDisciplinesAdmin = async () => {
  const disciplines = await Disciplines.find({});
  return disciplines;
};

const getDisciplinesByIdAdmin = async (id) => {
  const disciplines = await Disciplines.findById(id);
  return disciplines;
};

const createDisciplines = async (user, body) => {
  const disciplines = new Disciplines({
    data: { ...body },
    updatedBy: user._id,
  });
  await disciplines.save();
  return disciplines;
};

const updateDisciplines = async (user, body, id) => {
  const disciplines = await Disciplines.findByIdAndUpdate(id, {
    $set: { data: body, updatedBy: user._Id },
  });
  await disciplines.save();
  return disciplines;
};

const deleteDisciplines = async (id) => {
  const disciplines = await Disciplines.findByIdAndDelete(id);
  return disciplines;
};

module.exports = {
  getDisciplines,
  getDisciplinesFilter,
  getDisciplinesAdmin,
  getDisciplinesByIdAdmin,
  createDisciplines,
  updateDisciplines,
  deleteDisciplines,
};
