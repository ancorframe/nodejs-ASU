const Joi = require("joi");

const itemSchema = Joi.object()
  .keys({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    source: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    _id: Joi.string().min(3).optional(),
  })
  .unknown(false);

const postSupportSchema = Joi.object()
  .keys({
    content: Joi.string().min(3).required(),
    books: Joi.array().items(itemSchema).required(),
  })
  .unknown(false);

const putSupportSchema = Joi.object()
  .keys({
    content: Joi.string().min(3).required(),
    books: Joi.array().items(itemSchema).required(),
  })
  .unknown(false);

module.exports = {
  postSupportSchema,
  putSupportSchema,
};
