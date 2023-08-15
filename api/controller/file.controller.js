import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper";
import { uploadImage } from "../services/file.service";

export const uploadImageController = (req, res) => {
  try {
    const file = req.file;
    const result = uploadImage(file);

    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
