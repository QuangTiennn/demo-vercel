import Joi from "joi";

export const registerValidate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().optional(),
    code: Joi.string().required(),
    avatar: Joi.string().optional(),
  }),
};
export const loginValidate = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
export const sendOTPValidate = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

export const forgotPasswordValidate = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    code: Joi.string().required(),
  }),
};

export const changePasswordValidate = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    old_password: Joi.string().required(),
  }),
};
