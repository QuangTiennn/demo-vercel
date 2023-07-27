import Joi from "joi";

export const createTaskValidate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().optional(),
  }),
};
export const updateTaskValidate = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional(),
  }),
};
