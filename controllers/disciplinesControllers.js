const { ErrorConstructor } = require("../helpers/errors");
const {
  getDisciplines,
  getDisciplinesFilter,
  getDisciplinesAdmin,
  createDisciplines,
  updateDisciplines,
  deleteDisciplines,
  getDisciplinesByIdAdmin,
} = require("../services/disciplinesServices");

const getDisciplinesController = async (req, res) => {
  try {
     const { course, specialty } = req.query;
    const disciplines = await getDisciplines(course, specialty);
    res.json({ disciplines });
  } catch (error) {
    throw new ErrorConstructor(404, `Disciplines not found`);
  }
};

;
const getDisciplinesFilterController = async (req, res) => {
  try {
    const filter = await getDisciplinesFilter();
    res.json({ ...filter });
  } catch (error) {
    throw new ErrorConstructor(404, `Disciplines not found`);
  }
};
// admin

const getDisciplinesAdminController = async (req, res) => {
  try {
    const disciplines = await getDisciplinesAdmin();
    res.json({ disciplines });
  } catch (error) {
    throw new ErrorConstructor(404, `Disciplines not found`);
  }
};

const getDisciplinesByIdAdminController = async (req, res) => {
  const {id}=req.params
  try {
    const disciplines = await getDisciplinesByIdAdmin(id);
    res.json({ disciplines });
  } catch (error) {
    throw new ErrorConstructor(404, `Disciplines not found`);
  }
};

const createDisciplinesController = async (req, res) => {
  const { user, body } = req;
  try {
    await createDisciplines(user, body);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateDisciplinesController = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;
  try {
    await updateDisciplines(user, body, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const deleteDisciplinesController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDisciplines(id);
    res.json({
      message: `Delete success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getDisciplinesController,
  getDisciplinesFilterController,
  createDisciplinesController,
  getDisciplinesByIdAdminController,
  getDisciplinesAdminController,
  updateDisciplinesController,
  deleteDisciplinesController,
};
