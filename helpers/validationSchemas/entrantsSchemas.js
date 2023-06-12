const Joi = require("joi");

const postEntrantsSchema = Joi.object()
  .keys({
    degree: Joi.string()
      .valid("bachelor", "magistracy", "postgraduate")
      .required(),
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

const putEntrantsSchema = Joi.object()
  .keys({
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

module.exports = {
  postEntrantsSchema,
  putEntrantsSchema,
};
