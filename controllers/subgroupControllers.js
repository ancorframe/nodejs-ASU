const { ErrorConstructor } = require("../helpers/errors");
const {
  getSubgroup,
  createSubgroup,
  updateSubgroup,
} = require("../services/subgroupServices");

const getSubgroupController = async (req, res) => {
  try {
    const subgroup = await getSubgroup();
    res.json({ subgroup });
  } catch (error) {
    throw new ErrorConstructor(404, `Subgroup not found`);
  }
};

const createSubgroupController = async (req, res) => {
  const { user } = req;
  try {
    await createSubgroup(user);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateSubgroupController = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;
  try {
    await updateSubgroup(user, body, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getSubgroupController,
  createSubgroupController,
  updateSubgroupController,
};
