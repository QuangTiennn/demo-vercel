import bcrypt from "bcrypt";

import { STATUS_CODE } from "../constants/index.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { errorResponse, successResponse } from "../helpers/response.helper.js";
import userModel from "../models/user.model.js";
export const register = async (payload) => {
  try {
    const userExisted = await userModel.findOne({ email: payload.email });

    if (userExisted) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.USER_EXISTED);
    }

    const pwHashed = await bcrypt.hash(payload.password, 10);

    const user = await userModel.create({
      ...payload,
      password: pwHashed,
    });

    if (!user) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.FAIL);
    }
    return successResponse(user);
  } catch (error) {
    return errorResponse();
  }
};

export const login = async (payload) => {
  try {
    const user = await userModel.findOne({ email: payload.email });

    if (!user) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.USER_NOT_EXIST);
    }

    const comparePassword = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!comparePassword) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.WRONG_PASSWORD);
    }

    const jwtSecret = process.env.JWT_SECRET || "laskjdefaksdherusdlak";
    const token = jwt.sign({ _id: user._id }, jwtSecret, {
      expiresIn: "30d",
    });

    return successResponse();
  } catch (error) {
    return errorResponse();
  }
};
