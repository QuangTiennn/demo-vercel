import { MESSAGES } from "../constants.js";
import { errorResponse, successResponse } from "../helpers/response.helper.js";

export const uploadImage = (file) => {
  try {
    if (!file) {
      return errorResponse(MESSAGES.FILE_NOT_FOUND);
    }

    return successResponse({ file: file.filename });
  } catch (error) {
    return errorResponse(error.message);
  }
};
