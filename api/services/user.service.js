import bcrypt from "bcrypt";
import { MESSAGES, STATUS_CODE } from "../constants/index";
import { errorResponse, successResponse } from "../helpers/response.helper.js";
import userModel from "../models/user.model.js";
export const getMe = async (id) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.USER_NOT_EXIST);
    }
    return successResponse(user);
  } catch (error) {
    return errorResponse();
  }
};

export const updateUserProfile = async (id, payload) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.USER_NOT_EXIST);
    }

    if (payload.password) {
      const pwHashed = await bcrypt.hash(payload.password, 10);
      np;
      payload.password = pwHashed;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        user._id,
        {
          ...payload,
        },
        { new: true }
      )
      .select("-password");

    if (!updatedUser) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.FAIL);
    }

    return successResponse(updatedUser);
  } catch (error) {
    return errorResponse();
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.USER_NOT_EXIST);
    }

    const deleteUser = await userModel.deleteOne({ _id: user._id });

    if (!deleteUser) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.FAIL);
    }

    return successResponse();
  } catch (error) {
    return errorResponse();
  }
};
