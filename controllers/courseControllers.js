const { ErrorConstructor } = require("../helpers/errors");
const {
  getCourse,
  createCourse,
  updateCourse,
} = require("../services/courseServices");

const getCourseController = async (req, res) => {
  try {
    const course = await getCourse();
    res.json({ course });
  } catch (error) {
    throw new ErrorConstructor(404, `Course not found`);
  }
};

const createCourseController = async (req, res) => {
  const { user } = req;
  try {
    await createCourse(user);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateCourseController = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;
  try {
    await updateCourse(user, body, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getCourseController,
  createCourseController,
  updateCourseController,
};
