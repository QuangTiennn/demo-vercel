export const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "files"]);

  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    console.log(error, "[<<<------- error ------->>>]");

    const errorMessage = error.details[0].message;
    // .map((details) => details.message)
    // .join(", ");
    // throw new Error(errorMessage)
    handleErrorResponse(res, STATUS_CODE.BAD_REQUEST, errorMessage);
    // res
    //   .status(STATUS_CODE.BAD_REQUEST)
    //   .send(errorResponse(STATUS_CODE.BAD_REQUEST, errorMessage));
    return;
  }
  Object.assign(req, value);

  return next();
};
