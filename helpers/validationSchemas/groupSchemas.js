const Joi = require("joi");

const itemSchema = Joi.object()
  .keys({
    value: Joi.string().min(3).required(),
    label: Joi.string().min(1).required(),
  })
  .unknown(false);

const patchGroupSchema = Joi.object()
  .keys({
    group: Joi.array().items(itemSchema).required(),
  })
  .unknown(false);

module.exports = {
  patchGroupSchema,
};
