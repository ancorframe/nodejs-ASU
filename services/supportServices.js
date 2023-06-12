const { Support } = require("../db/models/supportModel");

const getSupport = async () => {
  const support = await Support.find({}, { data: 1 });
  return support[0];
};

// admin

const getSupportAdmin = async () => {
  const support = await Support.find({});
  return support[0];
};

const createSupport = async (user, body) => {
  const support = new Support({
    data: { ...body },
    updatedBy: user._id,
  });
  await support.save();
  return support;
};

const updateSupport = async (user, body, id) => {
  const support = await Support.findByIdAndUpdate(
    id,
    {
      $set: { data: body, updatedBy: user._Id },
    }
  );
  await support.save();
  return support;
};

module.exports = {
  getSupport,
  getSupportAdmin,
  createSupport,
  updateSupport,
};
