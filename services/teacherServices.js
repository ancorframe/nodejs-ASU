const { Teacher } = require("../db/models/teacherModel");
const { imageSaver } = require("../helpers/imageSaver");

const getTeachers = async () => {
  const teachers = await Teacher.find(
    {},
    { data: { fullName: 1, degree: 1, image: 1 } }
  );
  return teachers;
};

const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id, {
    data: 1,
  });
  return teacher;
};

// admin

const getTeachersAdmin = async () => {
  const teachers = await Teacher.find({});
  return teachers;
};

const getTeacherByIdAdmin = async (id, user) => {
  const teacher = await Teacher.findById(id);
  return teacher;
};

const addTeacher = async (body, userId, filename) => {
  const image = await imageSaver(filename);
  const teacher = new Teacher({
    data: { ...body, image },
    updatedBy: userId,
  });
  return await teacher.save();
};

const updateTeacherById = async (id, body, userId, filename) => {
  if (filename) {
    const image = await imageSaver(filename);
    const teacher = await Teacher.findByIdAndUpdate(id, {
      $set: { data: { ...body, image }, updatedBy: userId },
    });
    return teacher;
  }
  const teacher = await Teacher.findByIdAndUpdate(id, {
    $set: { data: body, updatedBy: userId },
  });
  return teacher;
};

const deleteTeacherById = async (id) => {
  const teacher = await Teacher.findByIdAndDelete(id);
  return teacher;
};

module.exports = {
  getTeachers,
  getTeacherById,
  getTeachersAdmin,
  getTeacherByIdAdmin,
  addTeacher,
  updateTeacherById,
  deleteTeacherById,
};
