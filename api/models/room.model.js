import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    participants: {
      type: [mongoose.Types.ObjectId],
      ref: "users",
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    type: {
      type: String,
      default: "single",
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomSchema);

export default roomModel;
