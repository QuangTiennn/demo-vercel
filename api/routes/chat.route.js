import { Router } from "express";
import {
  createChatRoomController,
  deleteChatRoomController,
  getChatRoomDetailController,
} from "../controller/chat.controller.js";

// Initialization
const chatRoute = Router();

// Requests

/**
 * @swagger
 * /chat/create:
 *   post:
 *     summary: create room
 *     description: create room
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participants:
 *                 type: array
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
chatRoute.post(
  "/create",
  //   authMiddleware,
  //   validate(createTaskValidate),
  createChatRoomController
);
/**
 * @swagger
 * /chat/room-detail/{id}:
 *   get:
 *     summary: get list message
 *     description: get list message
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
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
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
chatRoute.get(
  "/room-detail/:id",
  //   authMiddleware,
  //   validate(updateUserValidate),
  getChatRoomDetailController
);
/**
 * @swagger
 * /chat/room/{id}:
 *   delete:
 *     summary: get list message
 *     description: get list message
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
chatRoute.delete(
  "/room/:id",
  //   authMiddleware,
  //   validate(updateUserValidate),
  deleteChatRoomController
);

export default chatRoute;
