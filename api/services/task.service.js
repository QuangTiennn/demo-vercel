import {
  MESSAGES,
  STATUS_CODE,
  TYPE_DELETE_ALL_RESTORE_ALL,
} from "../constants/index.js";
import { currentTime } from "../helpers/index.js";
import { errorResponse, successResponse } from "../helpers/response.helper.js";
import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";
export const createTask = async (id, payload) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(MESSAGES.USER_NOT_EXIST, STATUS_CODE.BAD_REQUEST);
    }

    const task = await taskModel.create({ ...payload, created_by: user._id });

    if (!task) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(task);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getDetail = async (userId, taskId) => {
  try {
    const task = await taskModel
      .findOne({
        _id: taskId,
        created_by: userId,
        deletedAt: null,
      })
      .populate([
        {
          path: "created_by",
          model: userModel,
          select: ["-password"],
        },
      ]);

    if (!task) {
      return errorResponse(MESSAGES.TASK_NOT_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(task);
  } catch (error) {
    return errorResponse(error.message);
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
          select: ["-password"],
        },
      ],
    };

    let conditions = {
      created_by: userId,
    };

    if (filter && filter.status) {
      conditions["status"] = filter.status;
    }

    filter && filter.deleted == true
      ? (conditions["deletedAt"] = {
          $ne: null,
        })
      : (conditions["deletedAt"] = {
          $eq: null,
        });

    const tasks = await taskModel.paginate(conditions, options);

    return successResponse(tasks);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const updateTaskHasSocket = async (payload) => {
  try {
    const { id, ...rest } = payload;
    const task = await taskModel.findById(id);

    if (!task) {
      return errorResponse(MESSAGES.TASK_NOT_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    const updatedTask = await taskModel.findByIdAndUpdate(task._id, rest, {
      new: true,
    });

    if (!updatedTask) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(updatedTask);
  } catch (error) {
    return errorResponse(error.message);
  }
};
export const updateTask = async (userId, taskId, payload) => {
  try {
    const task = await taskModel.findOne({
      _id: taskId,
      created_by: userId,
      deletedAt: null,
    });

    if (!task) {
      return errorResponse(MESSAGES.TASK_NOT_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    const updatedTask = await taskModel.findByIdAndUpdate(task._id, payload, {
      new: true,
    });

    if (!updatedTask) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(updatedTask);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const deleteTask = async (userId, taskId) => {
  try {
    const task = await taskModel.findOne({
      _id: taskId,
      created_by: userId,
      deletedAt: null,
    });

    if (!task) {
      return errorResponse(MESSAGES.TASK_NOT_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    const deletedTask = await taskModel.findOneAndUpdate(
      task._id,
      {
        deletedAt: currentTime,
      },
      { new: true }
    );

    if (!deletedTask) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(deletedTask);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const multipleDeleteTask = async (id, payload) => {
  try {
    let result;
    if (payload.type === TYPE_DELETE_ALL_RESTORE_ALL.DELETE_ALL) {
      result = await taskModel.deleteMany({
        created_by: id,
        deletedAt: { $ne: null },
      });
    } else {
      result = await taskModel.deleteMany({
        created_by: id,
        _id: { $in: payload.ids },
      });
    }
    if (!result) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse();
  } catch (error) {
    return errorResponse(error.message);
  }
};
export const multipleRestoreTask = async (id, payload) => {
  try {
    let result;
    if (payload.type === TYPE_DELETE_ALL_RESTORE_ALL.RESTORE_ALL) {
      result = await taskModel.updateMany(
        {
          created_by: id,
          deletedAt: { $ne: null },
        },
        {
          $set: { deletedAt: null },
        },
        { new: true }
      );
    } else {
      result = await taskModel.updateMany(
        {
          created_by: id,
          _id: { $in: payload.ids },
        },
        {
          $set: { deletedAt: null },
        },
        { new: true }
      );
    }

    if (!result) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse();
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getAllTask = async (id, limit, page, filter) => {
  try {
    const options = {
      page,
      limit,
      populate: [
        {
          path: "created_by",
          model: userModel,
          select: ["-password"],
        },
      ],
    };
    let conditions = {};
    if (filter && filter.status) {
      conditions["status"] = filter.status;
    }

    filter && filter.deleted == true
      ? (conditions["deletedAt"] = {
          $ne: null,
        })
      : (conditions["deletedAt"] = {
          $eq: null,
        });

    const tasks = await taskModel.paginate(conditions, options);

    return successResponse(tasks);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const deleteTaskHasSocket = async (id) => {
  try {
    const task = await taskModel.findById(id);

    if (!task) {
      return errorResponse(MESSAGES.TASK_NOT_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    const deletedTask = await taskModel.findOneAndUpdate(
      task._id,
      {
        deletedAt: currentTime,
      },
      { new: true }
    );

    if (!deletedTask) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(deletedTask);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getDetailWithoutAuthor = async (taskId) => {
  try {
    const task = await taskModel
      .findOne({
        _id: taskId,
        deletedAt: null,
      })
      .populate([
        {
          path: "created_by",
          model: userModel,
          select: ["-password"],
        },
      ]);

    if (!task) {
      return errorResponse(MESSAGES.TASK_NOT_EXISTED, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(task);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const createTaskWithSocket = async (id, payload) => {
  try {
    const task = await taskModel.create({ ...payload, created_by: id || null });

    if (!task) {
      return errorResponse(MESSAGES.FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return successResponse(task);
  } catch (error) {
    return errorResponse(error.message);
  }
};
