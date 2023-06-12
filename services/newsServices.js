const { News } = require("../db/models/newsModel");
const { imageSaver } = require("../helpers/imageSaver");

const getNews = async (page, limit, filters) => {
  const query = [{ ...filters }, { data: { title: 1, image: 1, date: 1 } }];
  const news = await News.find(...query)
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit);
  
  let count = await News.countDocuments(...query);
  count = Math.ceil(count / limit);

  return { news, totalPage: count,nextPage:page+2 };
};

const getNewsById = async (id) => {
  const news = await News.findById(id, { data: 1 });
  const recommendation = await News.find(
    { _id: { $ne: id } },
    { data: { title: 1, image: 1, date: 1 } }
  )
    .sort({ createdAt: -1 })
    .limit(3);
  return { news, recommendation };
};

// admin

const getNewsAdmin = async () => {
  const news = await News.find({}).sort({ createdAt: -1 });
  return news;
};

const getNewsByIdAdmin = async (id) => {
  const news = await News.findById(id);
  return news;
};

const addNews = async (userId, body, filename) => {
  const image = await imageSaver(filename);
  const data = { ...body, image };
  const news = new News({ data: data, updatedBy: userId });
  await news.save();
  return news;
};

const updateNewsById = async (id, body, userId, filename) => {
  if (filename) {
    const image = await imageSaver(filename);
    const news = await News.findByIdAndUpdate(id, {
      $set: { data: { ...body, image }, updatedBy: userId },
    });
    return news;
  }
  const news = await News.findByIdAndUpdate(id, {
    $set: { data: body, updatedBy: userId },
  });
  return news;
};

const deleteNewsById = async (id) => {
  const news = await News.findByIdAndDelete(id);
  return news;
};

module.exports = {
  getNews,
  getNewsById,
  getNewsAdmin,
  getNewsByIdAdmin,
  addNews,
  updateNewsById,
  deleteNewsById,
};
