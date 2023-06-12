const { ErrorConstructor } = require("../helpers/errors");
const {
  getSupport,
  getSupportAdmin,
  createSupport,
  updateSupport,
} = require("../services/supportServices");

const getSupportController = async (req, res) => {
  try {
    const support = await getSupport();
    res.json({ support });
  } catch (error) {
    throw new ErrorConstructor(404, `Support not found`);
  }
};

// admin

const getSupportAdminController = async (req, res) => {
  try {
    const support = await getSupportAdmin();
    res.json({ support });
  } catch (error) {
    throw new ErrorConstructor(404, `Support not found`);
  }
};

const createSupportController = async (req, res) => {
  const { user, body } = req;
  try {
    await createSupport(user, body);
    res.json({ message: `create success` });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updateSupportController = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;
  try {
    await updateSupport(user, body, id);
    res.json({
      message: `updated success`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

module.exports = {
  getSupportController,
  getSupportAdminController,
  createSupportController,
  updateSupportController,
};
