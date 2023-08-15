import { MESSAGES } from "../constants";
import { errorResponse, successResponse } from "../helpers/response.helper";

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
