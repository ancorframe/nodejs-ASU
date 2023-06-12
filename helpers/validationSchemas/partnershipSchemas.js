const Joi = require("joi");

const postPartnershipSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    title: Joi.string().min(3).required(),
  })
  .unknown(false);

const putPartnershipSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    title: Joi.string().min(3).required(),
  })
  .unknown(false);

const postPartnershipDetailSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    logo: Joi.string().optional(),
    content: Joi.string().min(3).required(),
    url: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    refer: Joi.string().min(3).required(),
  })
  .unknown(false);

const putPartnershipDetailSchema = Joi.object()
  .keys({
    image: Joi.string().optional(),
    logo: Joi.string().optional(),
    content: Joi.string().min(3).required(),
    url: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
  })
  .unknown(false);

module.exports = {
  postPartnershipSchema,
  putPartnershipSchema,
  postPartnershipDetailSchema,
  putPartnershipDetailSchema,
};
