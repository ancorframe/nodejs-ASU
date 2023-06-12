const Joi = require("joi");

const itemSchema = Joi.object()
  .keys({
    value: Joi.string().min(3).required(),
    label: Joi.string().min(1).required(),
  })
  .unknown(false);

const patchSubgroupSchema = Joi.object()
  .keys({
    subgroup: Joi.array().items(itemSchema).required(),
  })
  .unknown(false);

module.exports = {
  patchSubgroupSchema,
};
