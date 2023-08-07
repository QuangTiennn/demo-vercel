import mongoose from "mongoose";
// import validator from "validator";
// import { roles } from "../config/roles";

const otpSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    is_used: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const otpModel = mongoose.model("otps", otpSchema);

export default otpModel;
