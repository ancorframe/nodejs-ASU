const Joi = require("joi");

const postLiteratureSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    specialty: Joi.string().min(3).required(),
    url: Joi.string().min(3).required(),
  })
  .unknown(false);

const putLiteratureSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    specialty: Joi.string().min(3).required(),
    url: Joi.string().min(3).required(),
  })
  .unknown(false);

module.exports = {
  postLiteratureSchema,
  putLiteratureSchema,
};
