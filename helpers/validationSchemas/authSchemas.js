const Joi = require("joi");

const userLoginSchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
  })
  .unknown(false);

const userRegisterSchema = Joi.object()
  .keys({
    fullName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
  })
  .unknown(false);

module.exports = {
  userLoginSchema,
  userRegisterSchema,
};
