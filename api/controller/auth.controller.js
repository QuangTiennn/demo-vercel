import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper.js";
import {
  forgotPassword,
  login,
  register,
  sendOTP,
} from "../services/auth.service.js";

export const registerController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await register(payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await login(payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const sendOTPController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await sendOTP(payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await forgotPassword(payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
