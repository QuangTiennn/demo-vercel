import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const messageSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Types.ObjectId,
      ref: "rooms",
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    message_content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(mongoosePaginate);

const messageModel = mongoose.model("messages", messageSchema);

messageModel.paginate();

export default messageModel;
