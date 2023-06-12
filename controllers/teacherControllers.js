const { ErrorConstructor } = require("../helpers/errors");
const {
  getTeachers,
  getTeacherById,
  getTeachersAdmin,
  getTeacherByIdAdmin,
  addTeacher,
  updateTeacherById,
  deleteTeacherById,
} = require("../services/teacherServices");

const getTeachersController = async (req, res) => {
  try {
    const teachers = await getTeachers();
    res.json({ teachers });
  } catch (error) {
    throw new ErrorConstructor(404, `Teachers not found`);
  }
};

const getTeacherByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await getTeacherById(id);
    res.json({ teacher });
  } catch (error) {
    throw new ErrorConstructor(404, `Teacher with id ${id} not found`);
  }
};

// admin

const getTeachersAdminController = async (req, res) => {
  try {
    const teachers = await getTeachersAdmin();
    res.json({ teachers });
  } catch (error) {
    throw new ErrorConstructor(404, `Teachers not found`);
  }
};

const getTeacherByIdAdminController = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await getTeacherByIdAdmin(id);
    res.json({ teacher });
  } catch (error) {
    throw new ErrorConstructor(404, `Teacher with id ${id} not found`);
  }
};

const addTeacherController = async (req, res) => {
  const filename = req.file.filename;
  const { _id: userId } = req.user;
  const { body } = req;
    if (!filename) {
      throw new ErrorConstructor(400, `Missing required field: image`);
    }
  try {
    const teacher = await addTeacher(body, userId,filename);
    res.status(201).json({ teacher });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateTeacherByIdController = async (req, res) => {
  const filename = req?.file?.filename;
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { body } = req;
  try {
    await updateTeacherById(id, body, userId, filename);
    res.json({
      message: `teacher with id:${id} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const deleteTeacherByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTeacherById(id);
    res.json({ message: `teacher with id:${id} deleted` });
  } catch (error) {
    throw new ErrorConstructor(404, `Teacher with id: ${id} not found`);
  }
};

module.exports = {
  getTeachersController,
  getTeacherByIdController,
  getTeachersAdminController,
  getTeacherByIdAdminController,
  addTeacherController,
  updateTeacherByIdController,
  deleteTeacherByIdController,
};
