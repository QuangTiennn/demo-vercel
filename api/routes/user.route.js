import { Router } from "express";
import {
  deleteUserController,
  getMeController,
  updateUserProfileController,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateUserValidate } from "../validations/user.validation.js";

// Initialization
const userRoute = Router();

// Requests
/**
 * @swagger
 * /user/update/profile:
 *   put:
 *     summary: update profile
 *     description: update profile
 *     tags : [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
userRoute.put(
  "/update/profile",
  authMiddleware,
  validate(updateUserValidate),
  updateUserProfileController
);

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: delete user
 *     description: delete user
 *     tags : [Users]
 *     parameters:
 *       - in: path
 *         name : id
 *     responses:
 *       200:
 *         description: Successful operation
 */
userRoute.delete("/delete/:id", authMiddleware, deleteUserController);
/**
 * @swagger
 * /user/get-me:
 *   get:
 *     summary: update profile
 *     description: update profile
 *     tags : [Users]
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
userRoute.get("/get-me", authMiddleware, getMeController);

export default userRoute;
