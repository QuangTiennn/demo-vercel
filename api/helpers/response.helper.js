export const successResponse = (
  body = null,
  statusCode = 200,
  message = "success"
) => {
  return {
    status_code: statusCode,
    success: true,
    message,
    body,
  };
};

export const errorResponse = (
  message = "Internal server error",
  statusCode = 500
) => {
  return {
    status_code: statusCode,
    success: false,
    message,
  };
};

export const handleErrorResponse = (
  res,
  message = "Internal server error",
  statusCode = 500
) => {
  res.status(statusCode).json({
    status_code: statusCode,
    success: false,
    message,
  });
};

export const handleSuccessResponse = (res, body = null, statusCode = 200) => {
  res.status(statusCode).json({
    ...body,
  });
};
