import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MESSAGES, STATUS_CODE } from "../constants/index.js";
import { errorResponse, successResponse } from "../helpers/response.helper.js";
import userModel from "../models/user.model.js";
export const register = async (payload) => {
  try {
    const userExisted = await userModel.findOne({ email: payload.email });

    if (userExisted) {
      return errorResponse(MESSAGES.USER_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    const pwHashed = await bcrypt.hash(payload.password, 10);

    const user = await userModel.create({
      ...payload,
      password: pwHashed,
    });

    if (!user) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }
    return successResponse(user);
  } catch (error) {
    return errorResponse(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export const login = async (payload) => {
  try {
    const user = await userModel.findOne({ email: payload.email });

    if (!user) {
      return errorResponse(MESSAGES.USER_NOT_EXIST, STATUS_CODE.BAD_REQUEST);
    }

    const comparePassword = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!comparePassword) {
      return errorResponse(MESSAGES.WRONG_PASSWORD, STATUS_CODE.BAD_REQUEST);
    }

    const jwtSecret = process.env.JWT_SECRET || "laskjdefaksdherusdlak";
    const token = jwt.sign({ _id: user._id }, jwtSecret, {
      expiresIn: "30d",
    });

    return successResponse({ token });
  } catch (error) {
    return errorResponse(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};
