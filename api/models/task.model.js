import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { TASK_STATUS } from "../constants/index";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    start_time: {
      type: Date,
      default: null,
    },
    end_time: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      default: TASK_STATUS.PROCESSING,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
taskSchema.plugin(mongoosePaginate);

const taskModel = mongoose.model("tasks", taskSchema);
taskModel.paginate();
export default taskModel;
