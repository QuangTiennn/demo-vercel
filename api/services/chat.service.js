import { MESSAGES } from "../constants/messages.constant.js";

import { errorResponse } from "../helpers/response.helper.js";
import messageModel from "../models/message.model.js";
import roomModel from "../models/room.model.js";

export const createChatRoom = async (payload, userId) => {
  try {
    const { participants } = payload;

    const chatRoomExisted = await roomModel.findOne({
      participants: { $elemMatch: { $in: participants }, created_by: userId },
    });

    if (chatRoomExisted) {
      return errorResponse(MESSAGES.CHAT_ROOM_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    const chatRoom = await roomModel.create({
      participants,
      created_by: userId,
    });

    return successResponse(chatRoom);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getChatRoomDetail = async (id, userId, limit, page) => {
  try {
    const foundRoom = await roomModel.findById(id);

    if (!foundRoom) {
      return errorResponse(
        MESSAGES.CHAT_ROOM_NOT_EXIST,
        STATUS_CODE.BAD_REQUEST
      );
    }

    const options = {
      page,
      limit,
      populate: [
        {
          path: "sender",
          model: userModel,
          select: ["-password"],
        },
      ],
    };
    const messages = await messageModel.paginate(conditions, options);
    return successResponse({ room: foundRoom, messages });
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const deleteChatRoom = async (id, userId) => {
  try {
    const foundRoom = await roomModel.findById(id);

    if (!foundRoom) {
      return errorResponse(
        MESSAGES.CHAT_ROOM_NOT_EXIST,
        STATUS_CODE.BAD_REQUEST
      );
    }

    const deletedRoom = await roomModel.deleteOne({ _id: id });
    return successResponse(deletedRoom);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const createMessage = async (data) => {
  try {
    console.log(data, "[<<<------- data ------->>>]");

    const room = await roomModel.findById(data.roomId);
    let newRoom;

    if (!room) {
      newRoom = await roomModel.create({
        participants: [data.senderId, data.recipientId],
        created_by: data.senderId,
      });
    }

    const message = await messageModel.create({
      ...data,
      room: data.roomId || newRoom._id,
      sender: data.senderId,
      recipient: data.recipientId,
      message_content: data.content,
    });

    return successResponse("message");
  } catch (error) {
    return errorResponse(error.message);
  }
};
