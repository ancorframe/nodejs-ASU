const Joi = require("joi");

const postConferenceSchema = Joi.object()
  .keys({
    title: Joi.string().min(3).required(),
    date: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

const putConferenceSchema = Joi.object()
  .keys({
    title: Joi.string().min(3).required(),
    date: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    image: Joi.string().min(3).optional(),
  })
  .unknown(false);

module.exports = {
  postConferenceSchema,
  putConferenceSchema,
};
