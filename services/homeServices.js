const { Home } = require("../db/models/homeModel");
const { imageSaver } = require("../helpers/imageSaver");

const getHome = async () => {
  const home = await Home.findOne({ unique: "unique" }, { data: 1 });
  return home;
};

// admin

const getHomeAdmin = async () => {
  const home = await Home.findOne({ unique: "unique" });
  return home;
};

const updateHome = async (body, filename, user, id) => {
  if (filename) {
    const image = await imageSaver(filename);
    const data = { ...body, image };
    const home = await Home.findOneAndUpdate(
      { _id: id },
      {
        $set: { data:data, updatedBy: user._id },
      }
    );
    home.save();
    return home;
  }
  const home = await Home.findOneAndUpdate(
    { _id: id },
    {
      $set: { data: body, updatedBy: user._id },
    }
  );
  await home.save();
  return home;
};

const createHome = async (body, user) => {
  const home = new Home({ data: body, updatedBy: user._id });
  await home.save();
  return home;
};

module.exports = {
  getHome,
  getHomeAdmin,
  createHome,
  updateHome,
};
