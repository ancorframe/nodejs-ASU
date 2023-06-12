const { ErrorConstructor } = require("../helpers/errors");
const {
  getResearch,
  getResearchAdmin,
  addResearch,
  updateResearchById,
} = require("../services/researchServices");

const getResearchController = async (req, res) => {
  try {
    const research = await getResearch();
    res.json({ research });
  } catch (error) {
    throw new ErrorConstructor(404, `Research not found`);
  }
};

// admin

const getResearchAdminController = async (req, res) => {
  try {
    const research = await getResearchAdmin();
    res.json({ research });
  } catch (error) {
    throw new ErrorConstructor(404, `Research not found`);
  }
};

const addResearchController = async (req, res) => {
  const { _id: userId } = req.user;
  const { body } = req;
  try {
    const research = await addResearch(body, userId);
    res.status(201).json({ research });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateResearchByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { body } = req;
  try {
    await updateResearchById(id, body, userId);
    res.json({
      message: `research with id:${id} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getResearchController,
  getResearchAdminController,
  addResearchController,
  updateResearchByIdController,
};
