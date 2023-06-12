const Joi = require("joi");

const itemSchema = Joi.object()
  .keys({
    value: Joi.string().min(3).required(),
    label: Joi.string().min(1).required(),
  })
  .unknown(false);

const postDisciplinesSchema = Joi.object()
  .keys({
    course: Joi.array().items(itemSchema).required(),
    specialty: Joi.array().items(itemSchema).required(),
    disciplines: Joi.string().min(1).required(),
  })
  .unknown(false);

const putDisciplinesSchema = Joi.object()
  .keys({
    course: Joi.array().items(itemSchema).required(),
    specialty: Joi.array().items(itemSchema).required(),
    disciplines: Joi.string().min(1).required(),
  })
  .unknown(false);

module.exports = {
  postDisciplinesSchema,
  putDisciplinesSchema,
};
