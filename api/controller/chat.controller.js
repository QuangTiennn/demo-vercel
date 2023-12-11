import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper.js";
import {
  createChatRoom,
  deleteChatRoom,
  getChatRoomDetail,
} from "../services/chat.service.js";

export const createChatRoomController = async (req, res) => {
  try {
    const userId = req.user._id;
    const payload = req.body;

    const result = await createChatRoom(payload, userId);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const getListChatRoomController = async (req, res) => {
  try {
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const getChatRoomDetailController = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const { limit, page } = req.query;
    const result = await getChatRoomDetail(id, userId, limit, page);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const deleteChatRoomController = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await deleteChatRoom(id);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

// export const createMessage = async (payload) => {};
