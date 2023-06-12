const { Research } = require("../db/models/researchModel");

const getResearch = async (user) => {
  const research = await Research.find({}, { data: 1 });
  return research[0];
};

// admin

const getResearchAdmin = async (user) => {
  const research = await Research.find({});
  return research[0];
};

const addResearch = async (body, userId) => {
  const research = new Research({
    data: body,
    updatedBy: userId,
  });
  const savedContact = await research.save();
  return savedContact;
};

const updateResearchById = async (id, body, userId) => {
  const research = await Research.findByIdAndUpdate(id, {
    $set: { data: body, updatedBy: userId },
  });
  return research;
};

module.exports = {
  getResearch,
  getResearchAdmin,
  addResearch,
  updateResearchById,
};
