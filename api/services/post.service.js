import { STATUS_CODE } from "../constants/common.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { currentTime } from "../helpers/index.js";

import { errorResponse, successResponse } from "../helpers/response.helper.js";
import postModel from "../models/post.model.js";

export const createPost = async (payload, userId) => {
  try {
    const post = await postModel.create({
      ...payload,
      created_by: userId,
    });

    return successResponse(post);
  } catch (error) {
    return errorResponse(error.message);
  }
};
export const updatePost = async (id, userId, payload) => {
  try {
    const post = await postModel.findOneAndUpdate(
      { _id: id, created_by: userId, deletedAt: null },
      {
        ...payload,
        created_by: userId,
      },
      { new: true }
    );

    return successResponse(post);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getPostDetail = async (id, userId) => {
  try {
    const foundPost = await postModel.findOne({
      _id: id,
      created_by: userId,
      deletedAt: null,
    });

    if (!foundPost) {
      return errorResponse(MESSAGES.POST_NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(foundPost);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const deletePost = async (id, userId) => {
  try {
    const post = await postModel.findOne({
      _id: id,
      created_by: userId,
      deletedAt: { $eq: null },
    });

    if (!post) {
      return errorResponse(MESSAGES.POST_NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }

    const deletePost = await postModel.findByIdAndUpdate(
      post._id,
      {
        deletedAt: currentTime,
      },
      { new: true }
    );

    if (!deletePost) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(deletePost);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getPosts = async (limit, page, userId) => {
  try {
    const options = {
      page,
      limit,
    };

    const posts = await postModel.paginate(
      { deletedAt: { $eq: null }, created_by: userId },
      options
    );

    return successResponse(posts);
  } catch (error) {
    return errorResponse(error.message);
  }
};
