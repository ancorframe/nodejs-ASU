const Joi = require("joi");

const postWhiteListSchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
  })
  .unknown(false);

const putWhiteListSchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
  })
  .unknown(false);

module.exports = {
  postWhiteListSchema,
  putWhiteListSchema,
};
