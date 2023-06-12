const Joi = require("joi");

const postTeacherSchema = Joi.object()
  .keys({
    fullName: Joi.string().min(3).required(),
      degree: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

const putTeacherSchema = Joi.object()
  .keys({
    fullName: Joi.string().min(3).required(),
    degree: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    image: Joi.string().min(3).optional(),
  })
  .unknown(false);


  module.exports = {
    postTeacherSchema,
    putTeacherSchema,
  };
