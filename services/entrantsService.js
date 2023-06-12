const { Entrants } = require("../db/models/entrantsModel");

const getEntrants = async () => {
  const entrants = await Entrants.find({}, { data: 1 });
  return entrants;
};

// admin

const getEntrantsAdmin = async () => {
  const entrants = await Entrants.find({});
  return entrants;
};

const getEntrantsByIdAdmin = async (id) => {
  const entrants = await Entrants.findById(id)
  return entrants;
};


const createEntrants = async (user, body) => {
  const entrants = new Entrants({
    data: { ...body },
    updatedBy: user._id,
  });
  await entrants.save();
  return entrants;
};

const updateEntrants = async (user, body, id) => {
  const { content } = body;
  const entrants = await Entrants.findByIdAndUpdate(id, {
    $set: { "data.content": content, updatedBy: user._id },
  });
  await entrants.save();
  return entrants;
};

module.exports = {
  getEntrants,
  getEntrantsAdmin,
  getEntrantsByIdAdmin,
  createEntrants,
  updateEntrants,
};
