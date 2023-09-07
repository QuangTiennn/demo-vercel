import Joi from "joi";
import { STATUS_CODE } from "../constants/common.constant.js";
import { pick } from "../helpers/index.js";
import { handleErrorResponse } from "../helpers/response.helper.js";

export const validate = (schema) => (req, res, next) => {
  try {
    const validSchema = pick(schema, ["params", "query", "body", "files"]);

    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details[0].message;
      // .map((details) => details.message)
      // .join(", ");
      // throw new Error(errorMessage)
      handleErrorResponse(res, errorMessage, STATUS_CODE.BAD_REQUEST);
      // res
      //   .status(STATUS_CODE.BAD_REQUEST)
      //   .send(errorResponse(STATUS_CODE.BAD_REQUEST, errorMessage));
      return;
    }

    Object.assign(req, value);

    next();
  } catch (error) {
    handleErrorResponse(res, error.message, STATUS_CODE.BAD_REQUEST);
  }
};
