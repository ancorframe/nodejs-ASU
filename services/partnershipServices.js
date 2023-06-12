const { Partnership } = require("../db/models/partnershipModel");
const { PartnershipDetail } = require("../db/models/partnershipModel");
const { imageSaver } = require("../helpers/imageSaver");

const getPartnership = async () => {
  const partnership = await Partnership.find({}, { data: 1 });
  return partnership;
};

const getPartnershipById = async (id) => {
  const detail = await PartnershipDetail.find({ refer: id }, { data: 1 });
  const partnership = await Partnership.findById(id, { data: { title: 1 } });
  return { detail, partnership };
};

// admin
const getPartnershipAdmin = async () => {
  const partnership = await Partnership.find({});
  return partnership;
};

const getPartnershipByIdAdmin = async (id) => {
  const partnership = await Partnership.findById(id);
  return partnership;
};

const getPartnershipListByIdAdmin = async (id) => {
  const detail = await PartnershipDetail.find({ refer: id });
  return detail;
};

const getPartnershipDetailById = async (id) => {
  const detail = await PartnershipDetail.findById(id);
  return detail;
};

const addPartnership = async (body, userId, filename) => {
  const image = await imageSaver(filename);
  const partnership = new Partnership({
    data: { ...body, image },
    updatedBy: userId,
  });
  await partnership.save();
  return partnership;
};

const addPartnershipDetail = async (userId, body, image, logo) => {
  const img = await imageSaver(image.filename);
  const log = await imageSaver(logo.filename);
  const { refer, ...data } = body;
  const detail = new PartnershipDetail({
    data: { ...data, image: img, logo: log },
    updatedBy: userId,
    refer,
  });
  await detail.save();
  return detail;
};

const updatePartnershipById = async (id, body, userId, filename) => {
  if (filename) {
    const image = await imageSaver(filename);
    const partnership = await Partnership.findByIdAndUpdate(id, {
      $set: { data: { ...body, image }, updatedBy: userId },
    });
    return partnership;
  }
  const partnership = await Partnership.findByIdAndUpdate(id, {
    $set: { data: body, updatedBy: userId },
  });

  return partnership;
};

const updatePartnershipDetailById = async (id, body, userId, req) => {
  if (req.files.image && req.files.logo) {
    const [image] = req.files.image;
    const [logo] = req.files.logo;
    const img = await imageSaver(image.filename);
    const log = await imageSaver(logo.filename);
    const partnership = await PartnershipDetail.findByIdAndUpdate(id, {
      $set: { data: { ...body, image: img, logo: log }, updatedBy: userId },
    });
    return partnership;
  }
  if (req.files.image) {
    const [image] = req.files.image;
    const img = await imageSaver(image.filename);
    const partnership = await PartnershipDetail.findByIdAndUpdate(id, {
      $set: { data: { ...body, image: img }, updatedBy: userId },
    });
    return partnership;
  }
  if (req.files.logo) {
    const [logo] = req.files.logo;
    const log = await imageSaver(logo.filename);
    const partnership = await PartnershipDetail.findByIdAndUpdate(id, {
      $set: { data: { ...body, logo: log }, updatedBy: userId },
    });
    return partnership;
  }
  const partnership = await PartnershipDetail.findByIdAndUpdate(id, {
    $set: { data: body, updatedBy: userId },
  });
  return partnership;
};

const deletePartnershipById = async (id) => {
  const partnership = await Partnership.findByIdAndDelete(id);
  return partnership;
};

const deletePartnershipDetailById = async (id) => {
  const partnership = await PartnershipDetail.findByIdAndDelete(id);
  return partnership;
};

module.exports = {
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
};
