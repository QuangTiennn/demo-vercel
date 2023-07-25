import mongoose from "mongoose";

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
      type: Date, // Change data type to Date
    },
    end_time: {
      type: Date, // Change data type to Date
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

const taskModel = mongoose.model("tasks", taskSchema);
export default taskModel;
