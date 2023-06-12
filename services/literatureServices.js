const { Literature } = require("../db/models/literatureModel");
const { imageSaver } = require("../helpers/imageSaver");

const getLiteratureFilter = async () => {
  const literature = await Literature.distinct('data.specialty')
  return  literature ;
};

const getLiterature = async (page, limit, searchQuery, specialty) => {
  const search = !searchQuery
    ? {}
    : {
        $or: [
          { "data.title": { $regex: searchQuery.trim(), $options: "i" } },
          { "data.author": { $regex: searchQuery.trim(), $options: "i" } },
        ],
      };
  const filter = !specialty ? {} : { "data.specialty.value": specialty };
  const query = [{ ...search, ...filter }, { data: 1 }];
  const literature = await Literature.find(...query)
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit);
  let count = await Literature.countDocuments(...query);
  count = Math.ceil(count / limit);
  return { literature, totalPage: count, nextPage: page + 2 };
};

// admin

const getLiteratureAdmin = async () => {
  const literature = await Literature.find({}).sort({ createdAt: -1 });
  return literature;
};

const getLiteratureById = async (id) => {
  const literature = await Literature.findById(id);
  return literature;
};

const addLiterature = async (body, userId, filename) => {
  const image = await imageSaver(filename);
  const newData = {...body, specialty:JSON.parse(body.specialty)}
  const literature = new Literature({
    data: { ...newData, image },
    updatedBy: userId,
  });
  await literature.save();
  return literature;
};

const updateLiteratureById = async (id, body, userId, filename) => {
  const newData = { ...body, specialty: JSON.parse(body.specialty) };
  if (filename) {
    const image = await imageSaver(filename);
    return await Literature.findByIdAndUpdate(id, {
      $set: { data: { ...newData, image }, updatedBy: userId },
    });
  }
  return await Literature.findByIdAndUpdate(id, {
    $set: { data: newData, updatedBy: userId },
  });
};

const deleteLiteratureById = async (id) => {
  const removeContact = await Literature.findByIdAndDelete(id);
  return removeContact;
};

module.exports = {
  getLiterature,
  getLiteratureFilter,
  getLiteratureAdmin,
  getLiteratureById,
  addLiterature,
  updateLiteratureById,
  deleteLiteratureById,
};
