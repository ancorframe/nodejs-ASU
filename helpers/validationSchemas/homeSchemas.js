const Joi = require("joi");

const postHomeSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    promoUrl: Joi.string().min(3).required(),
    promoAlt: Joi.string().min(3).required(),
  })
  .unknown(false);

const putHomeSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    promoUrl: Joi.string().min(3).required(),
    promoAlt: Joi.string().min(3).required(),
  })
  .unknown(false);

module.exports = {
  postHomeSchema,
  putHomeSchema,
};
