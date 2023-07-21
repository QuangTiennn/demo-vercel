import mongoose, { model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
      type: String,
      default: null,
    },
    end_time: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
taskSchema.plugin(mongoosePaginate);

const taskModel = model("tasks", taskSchema);
taskModel.paginate();
export default taskModel;
