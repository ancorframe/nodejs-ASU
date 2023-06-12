const Joi = require("joi");

const postNewsSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    date: Joi.string().min(3).required(),
  })
  .unknown(false);

const putNewsSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    date: Joi.string().min(3).required(),
  })
  .unknown(false);

module.exports = {
  postNewsSchema,
  putNewsSchema,
};
