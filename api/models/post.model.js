import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const postSchema = new mongoose.Schema(
  {
    video_id: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    year_of_manufacture: {
      type: String,
    },
    image: {
      type: String,
      trim: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    time: {
      type: Date,
      default: null,
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
postSchema.plugin(mongoosePaginate);

const postModel = mongoose.model("posts", postSchema);
postModel.paginate();
export default postModel;
