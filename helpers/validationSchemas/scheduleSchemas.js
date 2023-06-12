const Joi = require("joi");

const itemSchema = Joi.object()
  .keys({
    time: Joi.string().min(1).required(),
    tag: Joi.string().min(1).required(),
    teacher: Joi.string().min(1).required(),
    discipline: Joi.string().min(1).required(),
    _id: Joi.string().min(1).optional(),
  })
  .unknown(false);

const postScheduleSchema = Joi.object()
  .keys({
    course: Joi.object()
      .keys({
        value: Joi.string().min(1).required(),
        label: Joi.string().min(1).required(),
      })
      .unknown(false)
      .required(),
    group: Joi.object()
      .keys({
        value: Joi.string().min(1).required(),
        label: Joi.string().min(1).required(),
      })
      .unknown(false)
      .required(),
    subgroup: Joi.object()
      .keys({
        value: Joi.string().min(1).required(),
        label: Joi.string().min(1).required(),
      })
      .unknown(false)
      .required(),
    mon: Joi.array().items(itemSchema).required(),
    tue: Joi.array().items(itemSchema).required(),
    wed: Joi.array().items(itemSchema).required(),
    thu: Joi.array().items(itemSchema).required(),
    fri: Joi.array().items(itemSchema).required(),
  })
  .unknown(false);

const putScheduleSchema = Joi.object()
  .keys({
    course: Joi.object()
      .keys({
        value: Joi.string().min(1).required(),
        label: Joi.string().min(1).required(),
      })
      .unknown(false)
      .required(),
    group: Joi.object()
      .keys({
        value: Joi.string().min(1).required(),
        label: Joi.string().min(1).required(),
      })
      .unknown(false)
      .required(),
    subgroup: Joi.object()
      .keys({
        value: Joi.string().min(1).required(),
        label: Joi.string().min(1).required(),
      })
      .unknown(false)
      .required(),
    mon: Joi.array().items(itemSchema).required(),
    tue: Joi.array().items(itemSchema).required(),
    wed: Joi.array().items(itemSchema).required(),
    thu: Joi.array().items(itemSchema).required(),
    fri: Joi.array().items(itemSchema).required(),
  })
  .unknown(false);

module.exports = {
  postScheduleSchema,
  putScheduleSchema,
};
