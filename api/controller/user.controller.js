import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper.js";
import {
  deleteUser,
  getMe,
  updateUserProfile,
} from "../services/user.service.js";

export const updateUserProfileController = async (req, Requests) => {
  try {
    const id = req.user._id;

    const payload = req.body;
    const result = await updateUserProfile(id, payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
export const deleteUserController = async (req, Requests) => {
  try {
    const id = req.params.id;

    const result = await deleteUser(id);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
export const getMeController = async (req, Requests) => {
  try {
    const id = req.user._id;

    const result = await getMe(id);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
