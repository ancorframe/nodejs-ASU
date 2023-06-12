const { ErrorConstructor } = require("../helpers/errors");
const {
  putTeacherSchema,
  postTeacherSchema,
} = require("../helpers/validationSchemas/teacherSchemas");
const {
  postResearchSchema,
  putResearchSchema,
} = require("../helpers/validationSchemas/researchSchemas");
const {
  postConferenceSchema,
  putConferenceSchema,
} = require("../helpers/validationSchemas/conferenceSchemas");
const {
  postDisciplinesSchema,
  putDisciplinesSchema,
} = require("../helpers/validationSchemas/disciplinesSchemas");
const {
  postScheduleSchema,
  putScheduleSchema,
} = require("../helpers/validationSchemas/scheduleSchemas");
const {
  postEntrantsSchema,
  putEntrantsSchema,
} = require("../helpers/validationSchemas/entrantsSchemas");
const {
  postHistorySchema,
  putHistorySchema,
} = require("../helpers/validationSchemas/historySchemas");
const {
  postHomeSchema,
  putHomeSchema,
} = require("../helpers/validationSchemas/homeSchemas");
const {
  postNewsSchema,
  putNewsSchema,
} = require("../helpers/validationSchemas/newsSchemas");
const {
  postPartnershipSchema,
  putPartnershipSchema,
  postPartnershipDetailSchema,
  putPartnershipDetailSchema,
} = require("../helpers/validationSchemas/partnershipSchemas");
const {
  postSupportSchema,
  putSupportSchema,
} = require("../helpers/validationSchemas/supportSchemas");
const {
  postLiteratureSchema,
  putLiteratureSchema,
} = require("../helpers/validationSchemas/literatureSchemas");
const {
  userLoginSchema,
  userRegisterSchema,
} = require("../helpers/validationSchemas/authSchemas");
const {
  postWhiteListSchema,
  putWhiteListSchema,
} = require("../helpers/validationSchemas/whiteListSchemas");
const {
  patchSubgroupSchema,
} = require("../helpers/validationSchemas/subgroupSchemas");
const {
  patchGroupSchema,
} = require("../helpers/validationSchemas/groupSchemas");
const {
  patchCourseSchema,
} = require("../helpers/validationSchemas/courseSchemas");
const {
  patchSpecialtySchema,
} = require("../helpers/validationSchemas/specialtySchemas");

const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      throw new ErrorConstructor(
        400,
        validationResult.error.details[0].message
      );
    }
    next();
  };
};

// teacher validation
const postTeacherValidation = validation(postTeacherSchema);
const putTeacherValidation = validation(putTeacherSchema);

// research validation
const postResearchValidation = validation(postResearchSchema);
const putResearchValidation = validation(putResearchSchema);

// conference validation
const postConferenceValidation = validation(postConferenceSchema);
const putConferenceValidation = validation(putConferenceSchema);

// disciplines validation
const postDisciplinesValidation = validation(postDisciplinesSchema);
const putDisciplinesValidation = validation(putDisciplinesSchema);

// schedule validation
const postScheduleValidation = validation(postScheduleSchema);
const putScheduleValidation = validation(putScheduleSchema);

// entrants validation
const postEntrantsValidation = validation(postEntrantsSchema);
const putEntrantsValidation = validation(putEntrantsSchema);

// history validation
const postHistoryValidation = validation(postHistorySchema);
const putHistoryValidation = validation(putHistorySchema);

// home validation
const postHomeValidation = validation(postHomeSchema);
const putHomeValidation = validation(putHomeSchema);

// news validation
const postNewsValidation = validation(postNewsSchema);
const putNewsValidation = validation(putNewsSchema);

// partnership validation
const postPartnershipValidation = validation(postPartnershipSchema);
const putPartnershipValidation = validation(putPartnershipSchema);
const postPartnershipDetailValidation = validation(postPartnershipDetailSchema);
const putPartnershipDetailValidation = validation(putPartnershipDetailSchema);

// support validation
const postSupportValidation = validation(postSupportSchema);
const putSupportValidation = validation(putSupportSchema);

// literature validation
const postLiteratureValidation = validation(postLiteratureSchema);
const putLiteratureValidation = validation(putLiteratureSchema);

// user validation
const userLoginValidation = validation(userLoginSchema);
const userRegisterValidation = validation(userRegisterSchema);

// whitelist validation
const postWhiteListValidation = validation(postWhiteListSchema);
const putWhiteListValidation = validation(putWhiteListSchema);

// subgroup validation
const patchSubgroupValidation = validation(patchSubgroupSchema);

// group validation
const patchGroupValidation = validation(patchGroupSchema);

// course validation
const patchCourseValidation = validation(patchCourseSchema);

// specialty validation
const patchSpecialtyValidation = validation(patchSpecialtySchema);

module.exports = {
  postTeacherValidation,
  putTeacherValidation,

  postResearchValidation,
  putResearchValidation,

  postConferenceValidation,
  putConferenceValidation,

  postScheduleValidation,
  putScheduleValidation,

  postDisciplinesValidation,
  putDisciplinesValidation,

  postEntrantsValidation,
  putEntrantsValidation,

  postHistoryValidation,
  putHistoryValidation,

  postHomeValidation,
  putHomeValidation,

  postNewsValidation,
  putNewsValidation,

  postPartnershipValidation,
  putPartnershipValidation,
  postPartnershipDetailValidation,
  putPartnershipDetailValidation,

  postSupportValidation,
  putSupportValidation,

  postLiteratureValidation,
  putLiteratureValidation,

  userLoginValidation,
  userRegisterValidation,

  postWhiteListValidation,
  putWhiteListValidation,

  patchSubgroupValidation,

  patchGroupValidation,

  patchCourseValidation,

  patchSpecialtyValidation,
};
