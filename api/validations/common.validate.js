import Joi from "joi";

export const queryValidate = {
  query: Joi.object().keys({
    limit: Joi.number().optional().default(99999999),
    page: Joi.number().optional().default(1),
  }),
};
