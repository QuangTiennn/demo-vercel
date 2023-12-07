import mongoose from "mongoose";

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

const messageModel = mongoose.model("messages", messageSchema);
// messageSchema.plugin(mongoosePaginate);

// messageModel.paginate();

export default messageModel;
