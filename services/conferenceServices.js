const { Conference } = require("../db/models/conferenceModel");
const { imageSaver } = require("../helpers/imageSaver");

const getConferences = async (page, limit, filters) => {
  const query = [{ ...filters }, { data: { title: 1, image: 1, date: 1 } }];
  const conference = await Conference.find(...query)
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit);
  
  let count = await Conference.countDocuments(...query);
  count = Math.ceil(count / limit);
  return { conference, totalPage: count, nextPage: page + 2 };
};

const getConferenceById = async (id) => {
  const conference = await Conference.findById(id, { data: 1 });
  const recommendation = await Conference.find(
    { _id: { $ne: id } },
    { data: { title: 1, image: 1, date: 1 } }
  )
    .sort({ createdAt: -1 })
    .limit(3);
  return { conference, recommendation };
};

// admin

const addConference = async (userId, body, filename) => {
  const image = await imageSaver(filename);
  const data = { image, ...body };
  const conference = new Conference({ data: data, updatedBy: userId });
  await conference.save();
  return conference;
};

const updateConferenceById = async (id, body, userId, filename) => {
  if (!filename) {
    const conference = await Conference.findByIdAndUpdate(id, {
      $set: { data: body, updatedBy: userId },
    });
    return conference;
  }
  const image = await imageSaver(filename);
  const data = { image, ...body };
  const conference = await Conference.findByIdAndUpdate(id, {
    $set: { data: data, updatedBy: userId },
  });
  return conference;
};

const deleteConferenceById = async (id) => {
  const conference = await Conference.findByIdAndDelete(id);
  return conference;
};

const getConferencesAdmin = async () => {
  const conference = await Conference.find({}).sort({ createdAt: -1 });
  return { conference };
};

const getConferenceByIdAdmin = async (id) => {
  const conference = await Conference.findById(id);
  return conference;
};

module.exports = {
  getConferences,
  getConferenceById,
  addConference,
  updateConferenceById,
  deleteConferenceById,
  getConferencesAdmin,
  getConferenceByIdAdmin,
};
