import { MESSAGES } from "../constants/messages.constant.js";

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
      { _id: id, created_by: userId },
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
    const foundPost = await postModel.findOne({ _id: id, created_by: userId });

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
    const foundPost = await postModel.findOne({ _id: id, created_by: userId });

    if (!foundRoom) {
      return errorResponse(MESSAGES.POST_NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }

    const deletedPost = await postModel.deleteOne({ _id: foundPost._id });
    return successResponse(deletedPost);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getPosts = async (limit, page) => {
  try {
    const options = {
      page,
      limit,
    };

    const posts = await postModel.paginate({}, options);

    return successResponse(postsg);
  } catch (error) {
    return errorResponse(error.message);
  }
};
