import Joi from "joi";
import { TASK_STATUS } from "../constants/index.js";

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
    status: Joi.string()
      .valid(...Object.keys(TASK_STATUS))
      .optional(),
  }),
};

export const getListTaskValidate = {
  query: Joi.object().keys({
    limit: Joi.number().optional().default(99999999),
    page: Joi.number().optional().default(1),
    status: Joi.string().optional().allow(null),
    deleted: Joi.boolean().optional().allow(null).default(false),
  }),
};
