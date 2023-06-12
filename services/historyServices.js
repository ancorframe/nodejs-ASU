const { History } = require("../db/models/historyModel");

const getHistory = async () => {
  const history = await History.find({}, { data: 1 });
  return history[0];
};

// admin

const getHistoryAdmin = async () => {
  const history = await History.find({});
  return history[0];
};

const createHistory = async (user, body) => {
  const history = new History({
    data: { ...body },
    updatedBy: user._id,
  });
  history.save();
  return history;
};

const updateHistory = async (user, body, id) => {
  const history = await History.findByIdAndUpdate(
    { _id: id },
    {
      $set: { data: body, updatedBy: user._Id },
    }
  );
  history.save();
  return history;
};

module.exports = {
  getHistory,
  getHistoryAdmin,
  createHistory,
  updateHistory,
};
