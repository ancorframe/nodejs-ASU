const { ErrorConstructor } = require("../helpers/errors");
const {
  getSpecialty,
  createSpecialty,
  updateSpecialty,
} = require("../services/specialtyServices");

const getSpecialtyController = async (req, res) => {
  try {
    const specialty = await getSpecialty();
    res.json({ specialty });
  } catch (error) {
    throw new ErrorConstructor(404, `Specialty not found`);
  }
};

const createSpecialtyController = async (req, res) => {
  const { user } = req;
  try {
    await createSpecialty(user);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateSpecialtyController = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;
  try {
    await updateSpecialty(user, body, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getSpecialtyController,
  createSpecialtyController,
  updateSpecialtyController,
};
