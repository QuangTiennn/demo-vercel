import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/response.helper.js";
import {
  createTask,
  deleteTask,
  getDetail,
  getList,
  updateTask,
} from "../services/task.service.js";

export const createTaskController = async (req, res) => {
  try {
    const id = req.user._id;

    const payload = req.body;
    const result = await createTask(id, payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const getDetailTaskController = async (req, res) => {
  try {
    const id = req.user._id;
    const taskId = req.params.id;

    const result = await getDetail(id, taskId);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const getListTaskController = async (req, res) => {
  try {
    const id = req.user._id;
    const { limit, page, deleted, status } = req.query;
    console.log(req.query, "[<<<------- req.query ------->>>]");

    const result = await getList(id, Number(limit), Number(page), {
      deleted,
      status,
    });
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const id = req.user._id;
    const taskId = req.params.id;
    const payload = req.body;
    const result = await updateTask(id, taskId, payload);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const id = req.user._id;
    const taskId = req.params.id;

    const result = await deleteTask(id, taskId);
    if (!result.success) {
      handleErrorResponse(res, result.message, result.status_code);
    }
    handleSuccessResponse(res, result);
  } catch (error) {
    handleErrorResponse(res, error.message);
  }
};
