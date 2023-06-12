const { ErrorConstructor } = require("../helpers/errors");
const {
  getGroup,
  createGroup,
  updateGroup,
} = require("../services/groupServices");

const getGroupController = async (req, res) => {
  try {
    const group = await getGroup();
    res.json({ group });
  } catch (error) {
    throw new ErrorConstructor(404, `Group not found`);
  }
};

const createGroupController = async (req, res) => {
  const { user } = req;
  try {
    await createGroup(user);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateGroupController = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;
  try {
    await updateGroup(user, body, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getGroupController,
  createGroupController,
  updateGroupController,
};
