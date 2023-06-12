const { Course } = require("../db/models/courseModel");

const getCourse = async () => {
  const course = await Course.findOne({
    unique: "unique",
  });
  return course;
};

const createCourse = async (user) => {
  const course = new Course({
    data: { course: [] },
    updatedBy: user._id,
  });
  await course.save();
  return course;
};

const updateCourse = async (user, body, id) => {
  const course = await Course.findByIdAndUpdate(id, {
    $push: { "data.course": body },
  });
  await course.save();
  return course;
};

module.exports = {
  getCourse,
  createCourse,
  updateCourse,
};
