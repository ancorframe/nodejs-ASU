const { ErrorConstructor } = require("../helpers/errors");
const {
  getLiterature,
  getLiteratureFilter,
  getLiteratureAdmin,
  getLiteratureById,
  addLiterature,
  updateLiteratureById,
  deleteLiteratureById,
} = require("../services/literatureServices");

const getLiteratureFilterController = async (req, res) => {
  try {
    const filter = await getLiteratureFilter()
    res.json({ filter });
  } catch (error) {
    throw new ErrorConstructor(404, `Literature not found`);
  }
};

const getLiteratureController = async (req, res) => {
  try {
    let { page = 1, limit = 6, searchQuery = '', specialty } = req.query;
    page = parseInt(page) - 1;
    limit = parseInt(limit);
    const literature = await getLiterature(page, limit, searchQuery, specialty);
    res.json({ ...literature });
  } catch (error) {
    throw new ErrorConstructor(404, `Literature not found`);
  }
};

// admin

const getLiteratureAdminController = async (req, res) => {
  try {
    const literature = await getLiteratureAdmin();
    res.json({ literature });
  } catch (error) {
    throw new ErrorConstructor(404, `Literature not found`);
  }
};

const getLiteratureByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const literature = await getLiteratureById(id);
    res.json({ literature });
  } catch (error) {
    throw new ErrorConstructor(404, `News with id ${id} not found`);
  }
};

const addLiteratureController = async (req, res) => {
  const filename = req.file.filename;
  if (!filename) {
    throw new ErrorConstructor(400, `Missing required field: image`);
  }
  const { _id: userId } = req.user;
  const body = req.body;
  try {
    await addLiterature(body, userId, filename);
    res.status(201).json({ message: "success" });
  } catch (error) {
    console.error(error)
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateLiteratureByIdController = async (req, res) => {
  const filename = req?.file?.filename;
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { body } = req;
  try {
    await updateLiteratureById(id, body, userId, filename);
    res.json({
      message: `literature with id:${id} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const deleteLiteratureByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteLiteratureById(id);
    res.json({ message: `literature with id:${id} deleted` });
  } catch (error) {
    throw new ErrorConstructor(404, `News with id: ${id} not found`);
  }
};

module.exports = {
  getLiteratureController,
  getLiteratureFilterController,
  getLiteratureAdminController,
  getLiteratureByIdController,
  addLiteratureController,
  updateLiteratureByIdController,
  deleteLiteratureByIdController,
};
