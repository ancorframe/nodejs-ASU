const { ErrorConstructor } = require("../helpers/errors");
const {
  getConferences,
  getConferenceById,
  addConference,
  updateConferenceById,
  deleteConferenceById,
  getConferencesAdmin,
  getConferenceByIdAdmin,
} = require("../services/conferenceServices");

const getConferencesController = async (req, res) => {
  let { page = 1, limit = 10, ...filters } = req.query;
  page = parseInt(page) - 1;
  limit = parseInt(limit);
  try {
    const conference = await getConferences(page, limit, filters);
    res.json({ ...conference });
  } catch (error) {
    throw new ErrorConstructor(404, `Conferences not found`);
  }
};

const getConferenceByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const conference = await getConferenceById(id);
    res.json({ conference });
  } catch (error) {
    throw new ErrorConstructor(404, `Conference with id ${id} not found`);
  }
};

// admin

const getConferencesAdminController = async (req, res) => {
  try {
    const conference = await getConferencesAdmin();
    res.json({ ...conference });
  } catch (error) {
    throw new ErrorConstructor(404, `Conferences not found`);
  }
};

const getConferenceByIdAdminController = async (req, res) => {
  const { id } = req.params;
  try {
    const conference = await getConferenceByIdAdmin(id);
    res.json({ conference });
  } catch (error) {
    throw new ErrorConstructor(404, `Conference with id ${id} not found`);
  }
};

const addConferenceController = async (req, res) => {
  const { _id: userId } = req.user;
  const body = req.body;
  const filename = req.file.filename;
  if (!filename) {
    throw new ErrorConstructor(400, `Missing required field: image`);
  }
  try {
    await addConference(userId, body, filename);
    res.status(201).json({ message: "success" });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateConferenceByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { body } = req;
  const filename = req?.file?.filename;
  try {
    await updateConferenceById(id, body, userId, filename);
    res.json({
      message: `Conference with id:${id} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const deleteConferenceByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteConferenceById(id);
    res.json({ message: `Conference with id:${id} deleted` });
  } catch (error) {
    throw new ErrorConstructor(404, `Conference with id: ${id} not found`);
  }
};

module.exports = {
  getConferencesController,
  getConferenceByIdController,
  addConferenceController,
  updateConferenceByIdController,
  deleteConferenceByIdController,
  getConferencesAdminController,
  getConferenceByIdAdminController,
};
