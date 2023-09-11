import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MESSAGES, STATUS_CODE } from "../constants/index.js";
import { randomNumber } from "../helpers/index.js";
import { sendMail } from "../helpers/mail.js";
import { errorResponse, successResponse } from "../helpers/response.helper.js";
import otpModel from "../models/otp.model.js";
import userModel from "../models/user.model.js";
export const register = async (payload) => {
  try {
    const userExisted = await userModel.findOne({ email: payload.email });

    if (userExisted) {
      return errorResponse(MESSAGES.USER_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    const otp = await otpModel.findOneAndUpdate(
      { email: payload.email, code: payload.code },
      { $set: { is_used: true } }
    );

    if (!otp) {
      return errorResponse(MESSAGES.WRONG_OTP, STATUS_CODE.BAD_REQUEST);
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

export const sendOTP = async (payload) => {
  try {
    const code = randomNumber(4);

    const otp = await otpModel.create({
      code,
      email: payload.email,
    });

    if (!otp) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    var mailOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: "support.todoapp@yopmail.com",
      to: payload.email,
      subject: "Noreply",
      html: "<p>Todo app your code: </p>" + code,
    };
    sendMail(mailOptions);

    return successResponse({ code });
  } catch (error) {
    return errorResponse(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export const forgotPassword = async (payload) => {
  try {
    const user = await userModel.findOne({ email: payload.email });

    if (!user) {
      return errorResponse(MESSAGES.USER_NOT_EXIST, STATUS_CODE.BAD_REQUEST);
    }

    const otp = await otpModel.findOneAndUpdate(
      { email: payload.email, code: payload.code },
      { $set: { is_used: true } }
    );

    if (!otp) {
      return errorResponse(MESSAGES.WRONG_OTP, STATUS_CODE.BAD_REQUEST);
    }

    const pwHashed = await bcrypt.hash(payload.password, 10);

    const updatedUser = await userModel.findOneAndUpdate(
      { email: payload.email },
      {
        $set: {
          password: pwHashed,
        },
      }
    );

    if (!updatedUser) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse();
  } catch (error) {
    return errorResponse(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export const changePassword = async (id, payload) => {
  try {
    console.log(payload, "[<<<------- payload ------->>>]");

    const { old_password } = payload;

    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(MESSAGES.USER_NOT_EXIST, STATUS_CODE.BAD_REQUEST);
    }

    const comparePassword = await bcrypt.compare(old_password, user.password);

    if (!comparePassword) {
      return errorResponse(MESSAGES.WRONG_PASSWORD, STATUS_CODE.BAD_REQUEST);
    }
    const pwHashed = await bcrypt.hash(payload.password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(user._id, {
      $set: { password: pwHashed },
    });
    if (!updatedUser) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse();
  } catch (error) {
    return errorResponse(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};
