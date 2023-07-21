import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper.js";
import { login, register } from "../services/auth.service.js";

export const registerController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await register(payload);
    if (!result.success) {
      handleErrorResponse(res, result.status_code, result.message);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    console.log(error, "[<<<------- error ------->>>]");

    handleErrorResponse(res);
  }
};

export const loginController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await login(payload);
    if (!result.success) {
      handleErrorResponse(res, result.status_code, result.message);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res);
  }
};
