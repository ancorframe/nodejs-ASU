const { ErrorConstructor } = require("../helpers/errors");
const {
  getNews,
  getNewsById,
  getNewsAdmin,
  getNewsByIdAdmin,
  addNews,
  updateNewsById,
  deleteNewsById,
} = require("../services/newsServices");

const getNewsController = async (req, res) => {
  let { page = 1, limit = 9, ...filters } = req.query;
  page = parseInt(page) - 1;
  limit = parseInt(limit);
  try {
    const news = await getNews(page, limit, filters);
    res.json({ ...news });
  } catch (error) {
    throw new ErrorConstructor(404, `News not found`);
  }
};

const getNewsByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await getNewsById(id);
    res.json({ news });
  } catch (error) {
    throw new ErrorConstructor(404, `News with id ${id} not found`);
  }
};

// admin

const getNewsAdminController = async (req, res) => {
  try {
    const news = await getNewsAdmin();
    res.json({ news });
  } catch (error) {
    throw new ErrorConstructor(404, `News not found`);
  }
};

const getNewsByIdAdminController = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await getNewsByIdAdmin(id);
    res.json({ news });
  } catch (error) {
    throw new ErrorConstructor(404, `News with id ${id} not found`);
  }
};

const addNewsController = async (req, res) => {
  const filename = req.file.filename;
  const { _id: userId } = req.user;
  const { body } = req;
  if (!filename) {
    throw new ErrorConstructor(400, `Missing required field: image`);
  }
  try {
    await addNews(userId, body, filename);
    res.status(201).json({ message: "success" });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateNewsByIdController = async (req, res) => {
  const filename = req?.file?.filename;
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { body } = req;
  try {
    await updateNewsById(id, body, userId, filename);
    res.json({
      message: `News with id:${id} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const deleteNewsByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteNewsById(id);
    res.json({ message: `news with id:${id} deleted` });
  } catch (error) {
    throw new ErrorConstructor(404, `News with id: ${id} not found`);
  }
};

module.exports = {
  getNewsController,
  getNewsByIdController,
  getNewsAdminController,
  getNewsByIdAdminController,
  addNewsController,
  updateNewsByIdController,
  deleteNewsByIdController,
};
