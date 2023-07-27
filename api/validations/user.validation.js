import Joi from "joi";

export const updateUserValidate = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    age: Joi.string().optional(),
  }),
};
