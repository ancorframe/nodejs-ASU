const { ErrorConstructor } = require("../helpers/errors");
const {
  getHistory,
  getHistoryAdmin,
  createHistory,
  updateHistory,
} = require("../services/historyServices");

const getHistoryController = async (req, res) => {
  try {
    const history = await getHistory();
    res.json({ history });
  } catch (error) {
    throw new ErrorConstructor(404, `History not found`);
  }
};

// admin

const getHistoryAdminController = async (req, res) => {
  try {
    const history = await getHistoryAdmin();
    res.json({ history });
  } catch (error) {
    throw new ErrorConstructor(404, `History not found`);
  }
};

const createHistoryController = async (req, res) => {
  const user = req.user;
  const body = req.body;
  try {
    await createHistory(user, body);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateHistoryController = async (req, res) => {
  const user = req.user;
  const body = req.body;
  const { id } = req.params;
  try {
    await updateHistory(user, body, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(404, `History not found`);
  }
};

module.exports = {
  getHistoryController,
  getHistoryAdminController,
  createHistoryController,
  updateHistoryController,
};
