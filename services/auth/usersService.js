const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../db/models/auth/userModel");
const { Whitelist } = require("../../db/models/auth/whitelistModel");
const { ErrorConstructor } = require("../../helpers/errors");
const { Token } = require("../../db/models/auth/tokenModel");
const { v4: uuidv4 } = require("uuid");
const { randomTokenString } = require("../../helpers/randomTokenString");

const secret = process.env.JWT_SECRET_KEY;

const registerUser = async (body) => {
  const { fullName, password, email } = body;
  const checkWhitelist = await Whitelist.findOne({ email:  email });
  if (!checkWhitelist) {
    throw new ErrorConstructor(403, "Access denied");
  }
  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();
  return user.email;
};

const loginUser = async (body, deviceId) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new ErrorConstructor(404, "User not found");
  }
  const decodePassword = await bcrypt.compare(body.password, user.password);
  if (!decodePassword) {
    throw new ErrorConstructor(401, "Incorrect password");
  }
  const token = jwt.sign({ id: user._id, email: user.email }, secret);
  const refreshToken = randomTokenString();
  const { fullName, email, banned, _id } = user;
  const userData = {
    _id,
    email,
    banned,
    fullName,
  };
  const tokenDb = await Token.findOne({ deviceId, owner: user._id });
  if (!deviceId || !tokenDb) {
    const deviceId = uuidv4();
    const newToken = new Token({
      token,
      refreshToken,
      deviceId,
      owner: user._id,
    });
    await newToken.save();
    return { token, refreshToken, deviceId, userData };
  }
  tokenDb.token = token;
  tokenDb.refreshToken = refreshToken;
  await tokenDb.save();
  return { token, refreshToken, deviceId, userData };
};

const logoutUser = async (deviceId, id) => {
  await Token.findOneAndUpdate(
    { deviceId, owner: id },
    { $set: { token: "null", refreshToken: "null" } }
  );
};

const currentUser = async (user, deviceId) => {
  const token = jwt.sign({ id: user._id, email: user.email }, secret);
  const refreshToken = randomTokenString();
  await Token.findOneAndUpdate(
    { deviceId, owner: user._id },
    { $set: { token, refreshToken } }
  );
  return { token, refreshToken };
};

// const forgotPasswordUser = async (email) => {
//   const user = await User.findOne({ email, verify: true });
//   if (!user) {
//     throw new Error();
//   }
//   const token = jwt.sign(
//     { _id: user._id, email: user.email },
//     process.env.JWT_SECRET_KEY
//   );
//   const updateUser = await User.findByIdAndUpdate(user.id, {
//     $set: { token },
//   });
//   if (!updateUser) {
//     throw new Error();
//   }
//   const send = await restorePassword({
//     to: email,
//     link: `${UI_URL}/restorePassword/${token}`,
//   });
//   if (!send) {
//     throw new Error();
//   }
//   return user;
// };

// const restorePasswordUser = async (_id, password) => {
//   const user = await User.findOne({ _id, verify: true });
//   if (!user) {
//     throw new Error();
//   }
//   user.password = password;
//   user.save();
//   return user;
// };

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
};
