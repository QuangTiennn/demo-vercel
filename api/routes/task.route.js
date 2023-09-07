import { Router } from "express";

import {
  createTaskController,
  deleteTaskController,
  getDetailTaskController,
  getListTaskController,
  multipleDeleteTaskController,
  multipleRestoreTaskController,
  updateTaskController,
} from "../controller/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createTaskValidate,
  getListTaskValidate,
  multipleIds,
  updateTaskValidate,
} from "../validations/task.validation.js";

// Initialization
const taskRoute = Router();

// Requests
/**
 * @swagger
 * /task/create:
 *   post:
 *     summary: create task
 *     description: create task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status :
 *                 type : string
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
taskRoute.post(
  "/create",
  authMiddleware,
  validate(createTaskValidate),
  createTaskController
);
/**
 * @swagger
 * /task/get-detail/{id}:
 *   get:
 *     summary: get task detail
 *     description: get task detail
 *     tags: [Task]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The task id
 *     responses:
 *       200:
 *         description: Successful operation
 */
taskRoute.get("/get-detail/:id", authMiddleware, getDetailTaskController);
/**
 * @swagger
 * /task/get-list:
 *   get:
 *     summary: get list task
 *     description: get list task
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: status of task ["PROCESSING", "DONE", "FAIL"]
 *       - in: query
 *         name: deleted
 *         schema:
 *           type: boolean
 *         description: get tasks deleted
 *     responses:
 *       200:
 *         description: Successful operation
 */
taskRoute.get(
  "/get-list",
  authMiddleware,
  validate(getListTaskValidate),
  getListTaskController
);

/**
 * @swagger
 * /task/update/{id}:
 *   put:
 *     summary: update task
 *     description: update task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
taskRoute.put(
  "/update/:id",
  authMiddleware,
  validate(updateTaskValidate),
  updateTaskController
);

/**
 * @swagger
 * /task/delete/{id}:
 *   delete:
 *     summary: delete task
 *     description: delete task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
taskRoute.delete("/delete/:id", authMiddleware, deleteTaskController);

/**
 * @swagger
 * /task/multiple-delete:
 *   delete:
 *     summary: delete multiple task
 *     description: delete multiple task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *               type :
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
taskRoute.delete(
  "/multiple-delete",
  authMiddleware,
  validate(multipleIds),
  multipleDeleteTaskController
);
/**
 * @swagger
 * /task/multiple-restore:
 *   put:
 *     summary: restore multiple task
 *     description: restore multiple task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *               type :
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
taskRoute.put(
  "/multiple-restore",
  authMiddleware,
  validate(multipleIds),
  multipleRestoreTaskController
);

export default taskRoute;
