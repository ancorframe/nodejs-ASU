const { ErrorConstructor } = require("../helpers/errors");
const {
  getPartnership,
  getPartnershipById,
  getPartnershipAdmin,
  getPartnershipByIdAdmin,
  addPartnership,
  updatePartnershipById,
  deletePartnershipById,
  getPartnershipDetailById,
  addPartnershipDetail,
  updatePartnershipDetailById,
  deletePartnershipDetailById,
  getPartnershipListByIdAdmin,
} = require("../services/partnershipServices");

const getPartnershipController = async (req, res) => {
  try {
    const partnership = await getPartnership();
    res.json({ partnership });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership not found`);
  }
};

const getPartnershipByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const partnership = await getPartnershipById(id);
    res.json({ ...partnership });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership with id ${id} not found`);
  }
};

// admin

const getPartnershipAdminController = async (req, res) => {
  try {
    const partnership = await getPartnershipAdmin();
    res.json({ partnership });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership not found`);
  }
};

const getPartnershipByIdAdminController = async (req, res) => {
  const { id } = req.params;
  try {
    const partnership = await getPartnershipByIdAdmin(id);
    res.json({ partnership });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership with id ${id} not found`);
  }
};
const getPartnershipListByIdAdminController = async (req, res) => {
  const { id } = req.params;
  try {
    const partnership = await getPartnershipListByIdAdmin(id);
    res.json({ partnership });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership with id ${id} not found`);
  }
};

const getPartnershipDetailByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const partnership = await getPartnershipDetailById(id);
    res.json({ partnership });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership with id ${id} not found`);
  }
};

const addPartnershipController = async (req, res) => {
  const { _id: userId } = req.user;
  const { body } = req;
  const filename = req.file.filename;
  const partnership = await addPartnership(body, userId, filename);
  res.status(201).json({ partnership });
};

const addPartnershipDetailController = async (req, res) => {
  const { _id: userId } = req.user;
  const { body } = req;
  const [image] = req.files.image; // Array of uploaded image files
  const [logo] = req.files.logo; // Array of uploaded logo files
  if (!image || !logo) {
    throw new ErrorConstructor(400, `Missing required field`);
  }
  try {
    await addPartnershipDetail(userId, body, image, logo);
    res.status(201).json({ message: "success" });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updatePartnershipByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: postId } = req.params;
  const { body } = req;
  const filename = req?.file?.filename;
  try {
    await updatePartnershipById(postId, body, userId, filename);
    res.json({
      message: `Partnership with id:${postId} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const updatePartnershipDetailByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: postId } = req.params;
  const { body } = req;
  try {
    await updatePartnershipDetailById(postId, body, userId, req);
    res.json({
      message: `Partnership with id:${postId} updated`,
    });
  } catch (error) {
    throw new ErrorConstructor(400, `Something wrong( try again!`);
  }
};

const deletePartnershipByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    await deletePartnershipById(id);
    res.json({ message: `Partnership with id:${id} deleted` });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership with id: ${id} not found`);
  }
};

const deletePartnershipDetailByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    await deletePartnershipDetailById(id);
    res.json({ message: `Partnership with id:${id} deleted` });
  } catch (error) {
    throw new ErrorConstructor(404, `Partnership with id: ${id} not found`);
  }
};

module.exports = {
  getPartnershipController,
  getPartnershipByIdController,
  getPartnershipAdminController,
  getPartnershipByIdAdminController,
  addPartnershipController,
  updatePartnershipByIdController,
  deletePartnershipByIdController,
  getPartnershipDetailByIdController,
  addPartnershipDetailController,
  updatePartnershipDetailByIdController,
  deletePartnershipDetailByIdController,
  getPartnershipListByIdAdminController,
};
