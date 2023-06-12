const jwt = require("jsonwebtoken");
const { User } = require("../db/models/auth/userModel");
const { ErrorConstructor } = require("../helpers/errors");
const { Token } = require("../db/models/auth/tokenModel");

const currentMiddleware = async (req, res, next) => {
  if (!req.cookies.tokenJWT || !req.cookies.device_Id) {

    next(new ErrorConstructor(401, "Unauthorized"));
  }
  const token = req.cookies.tokenJWT;
  const deviceId = req.cookies.device_Id;
  try {
    const userReq = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id } = userReq;
    const tokenDb = await Token.findOne({ deviceId, owner: id });
    if (!tokenDb || tokenDb.token !== token) {
      next(new ErrorConstructor(401, "Unauthorized"));
    }
    const user = await User.findById(id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    req.user = user;
    next();
  } catch (error) {
    next(new ErrorConstructor(401, "Unauthorized"));
  }
};

module.exports = {
  currentMiddleware,
};
