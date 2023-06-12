const { ErrorConstructor } = require("../helpers/errors");
const {
  getEntrants,
  getEntrantsAdmin,
  getEntrantsByIdAdmin,
  createEntrants,
  updateEntrants,
} = require("../services/entrantsService");

const getEntrantsController = async (req, res) => {
  try {
    const entrants = await getEntrants();
    res.json({ entrants });
  } catch (error) {
    throw new ErrorConstructor(404, `Entrants not found`);
  }
};

// admin

const getEntrantsAdminController = async (req, res) => {
  try {
    const entrants = await getEntrantsAdmin();
    res.json({ entrants });
  } catch (error) {
    throw new ErrorConstructor(404, `Entrants not found`);
  }
};

const getEntrantsByIdAdminController = async (req, res) => {
    const { id } = req.params;
  try {
    const entrants = await getEntrantsByIdAdmin(id);
    res.json({ entrants });
  } catch (error) {
    throw new ErrorConstructor(404, `Entrants with id:${id} not found`);
  }
};


const createEntrantsController = async (req, res) => {
  const { user, body } = req;
  try {
    await createEntrants(user, body);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateEntrantsController = async (req, res) => {
  const { user, body } = req;
    const { id } = req.params;
  try {
    await updateEntrants(user, body,id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(404, `Entrants not found`);
  }
};

module.exports = {
  getEntrantsController,
  getEntrantsAdminController,
  getEntrantsByIdAdminController,
  createEntrantsController,
  updateEntrantsController,
};
