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
  statusCode = 500,
  message = "Internal server error"
) => {
  return {
    status_code: statusCode,
    success: false,
    message,
  };
};

export const handleErrorResponse = (
  res,
  statusCode = 500,
  message = "Internal server error"
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
