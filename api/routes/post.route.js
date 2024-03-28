import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getListPostController,
  getPostDetailController,
  updatePostController,
} from "../controller/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { queryValidate } from "../validations/common.validate.js";

// Initialization
const postRouter = Router();

// Requests

/**
 * @swagger
 * /post/create:
 *   post:
 *     summary: create post
 *     description: create post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              video_id:
 *                  type: string
 *              image :
 *                  type: string
 *              title:
 *                  type: string
 *              categories:
 *                  type: array
 *              year_of_manufacture:
 *                  type: string
 *              rate:
 *                  type: number
 *              time:
 *                  type: string
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
postRouter.post(
  "/create",
  authMiddleware,
  //   validate(createTaskValidate),
  createPostController
);
/**

/**
 * @swagger
 * /post/update/{id}:
 *   put:
 *     summary: update post
 *     description: update post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              video_id:
 *                  type: string
 *              image :
 *                  type: string
 *              title:
 *                  type: string
 *              categories:
 *                  type: array
 *              year_of_manufacture:
 *                  type: string
 *              rate:
 *                  type: number
 *              time:
 *                  type: string
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
postRouter.put(
  "/update/:id",
  authMiddleware,
  //   validate(createTaskValidate),
  updatePostController
);
/**
 * @swagger
 * /post/detail/{id}:
 *   get:
 *     summary: get post detail
 *     description: get post detail
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
postRouter.get(
  "/detail/:id",
  authMiddleware,
  //   validate(updateUserValidate),
  getPostDetailController
);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: delete post
 *     description: delete post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
postRouter.delete(
  "/:id",
  authMiddleware,
  //   validate(updateUserValidate),
  deletePostController
);

/**
 * @swagger
 * /post/get-list:
 *   get:
 *     summary: get list post
 *     description: get list post
 *     tags: [Post]
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
 *     responses:
 *       200:
 *         description: Successful operation
 */
postRouter.get(
  "/get-list",
  authMiddleware,
  validate(queryValidate),
  getListPostController
);

export default postRouter;
