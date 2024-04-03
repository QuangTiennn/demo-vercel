import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper.js";
import {
  createPost,
  deletePost,
  getPostDetail,
  getPosts,
  updatePost,
} from "../services/post.service.js";

export const createPostController = async (req, res) => {
  try {
    const userId = req.user._id;
    const payload = req.body;

    const result = await createPost(payload, userId);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const getPostDetailController = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const result = await getPostDetail(id, userId);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const updatePostController = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const payload = req.body;

    const result = await updatePost(id, userId, payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const deletePostController = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const result = await deletePost(id, userId);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const getListPostController = async (req, res) => {
  try {
    const id = req.user._id;
    const { limit, page } = req.query;

    const result = await getPosts(Number(limit), Number(page), id);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
