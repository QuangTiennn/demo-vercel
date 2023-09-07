import bcrypt from "bcrypt";
import { MESSAGES, STATUS_CODE } from "../constants/index.js";
import { errorResponse, successResponse } from "../helpers/response.helper.js";
import userModel from "../models/user.model.js";
export const getMe = async (id) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(MESSAGES.USER_NOT_EXIST, STATUS_CODE.BAD_REQUEST);
    }
    return successResponse(user);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const updateUserProfile = async (id, payload) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(MESSAGES.USER_NOT_EXIST, STATUS_CODE.BAD_REQUEST);
    }

    if (payload.password) {
      const pwHashed = await bcrypt.hash(payload.password, 10);
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
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(updatedUser);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(MESSAGES.USER_NOT_EXIST, STATUS_CODE.BAD_REQUEST);
    }

    const deleteUser = await userModel.deleteOne({ _id: user._id });

    if (!deleteUser) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse();
  } catch (error) {
    return errorResponse(error.message);
  }
};
