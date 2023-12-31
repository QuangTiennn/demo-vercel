import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper.js";
import {
  deleteUser,
  getList,
  getMe,
  updateUserProfile,
} from "../services/user.service.js";

export const updateUserProfileController = async (req, res) => {
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
export const deleteUserController = async (req, res) => {
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
export const getMeController = async (req, res) => {
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

export const getListUserController = async (req, res) => {
  try {
    const id = req.user._id;
    const { limit, page } = req.query;

    const result = await getList(id, Number(limit), Number(page));
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
