const Joi = require("joi");

const postHistorySchema = Joi.object()
  .keys({
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

const putHistorySchema = Joi.object()
  .keys({
    content: Joi.string().min(3).required(),
  })
  .unknown(false);

module.exports = {
  postHistorySchema,
  putHistorySchema,
};
