const Joi = require("joi");

const postResearchSchema = Joi.object()
  .keys({
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

const putResearchSchema = Joi.object()
  .keys({
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

module.exports = {
  postResearchSchema,
  putResearchSchema,
};
