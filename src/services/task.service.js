import { STATUS_CODE } from "../constants";
import { MESSAGES } from "../constants/messages.constant";
import { errorResponse, successResponse } from "../helpers/response.helper";
import taskModel from "../models/task.model";
import userModel from "../models/user.model";

export const createTask = async (id, payload) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.USER_NOT_EXIST);
    }

    const task = await taskModel.create({ ...payload, created_by: user._id });

    if (!task) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.FAIL);
    }

    return successResponse(task);
  } catch (error) {
    return errorResponse();
  }
};

export const getDetail = async (userId, taskId) => {
  try {
    const task = await taskModel.findOne({
      _id: taskId,
      created_by: userId,
    });

    if (!task) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.TASK_NOT_EXISTED);
    }

    return successResponse(task);
  } catch (error) {
    return errorResponse();
  }
};

export const getList = async (userId, limit, page, filter) => {
  try {
    const options = {
      page,
      limit,
      populate: [
        {
          path: "created_by",
          model: userModel,
        },
      ],
    };

    let conditions = {
      created_by: userId,
    };

    if (filter && filter.status) {
      conditions["status"] = filter.status;
    }
    const tasks = await taskModel.paginate({ created_by: userId }, options);

    return successResponse(tasks);
  } catch (error) {
    return errorResponse();
  }
};

export const updateTask = async (userId, taskId, payload) => {
  try {
    const task = await taskModel.findOne({
      _id: taskId,
      created_by: userId,
    });

    if (!task) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.TASK_NOT_EXISTED);
    }

    const updatedTask = await taskModel.findByIdAndUpdate(task._id, payload, {
      new: true,
    });

    if (!updatedTask) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.FAIL);
    }

    return successResponse(updatedTask);
  } catch (error) {
    return errorResponse();
  }
};

export const deleteTask = async (userId, taskId) => {
  try {
    const task = await taskModel.findOne({
      _id: taskId,
      created_by: userId,
    });

    if (!task) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.TASK_NOT_EXISTED);
    }

    const deletedTask = await taskModel.deleteOne(task._id);

    if (!deletedTask) {
      return errorResponse(STATUS_CODE.BAD_REQUEST, MESSAGES.FAIL);
    }

    return successResponse(deletedTask);
  } catch (error) {
    return errorResponse();
  }
};
