const { ErrorConstructor } = require("../helpers/errors");
const {
  getHome,
  getHomeAdmin,
  createHome,
  updateHome,
} = require("../services/homeServices");

const getHomeController = async (req, res) => {
  try {
    const home = await getHome();
    res.json({ home });
  } catch (error) {
    throw new ErrorConstructor(404, `Home not found`);
  }
};

// admin 

const getHomeAdminController = async (req, res) => {
  try {
    const home = await getHomeAdmin();
    res.json({ home });
  } catch (error) {
    throw new ErrorConstructor(404, `Home not found`);
  }
};

const updateHomeController = async (req, res) => {
  const filename = req?.file?.filename;
  const { user, body } = req;
  const { id } = req.params;
  try {
    await updateHome(body, filename, user, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(404, `Home not found`);
  }
};

const createHomeController = async (req, res) => {
  const { user, body } = req;
  try {
    await createHome(body, user);
    res.json({
      message: `create success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getHomeController,
  getHomeAdminController,
  createHomeController,
  updateHomeController,
};
