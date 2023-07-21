import { Router } from "express";
import {
  deleteUserController,
  updateUserProfileController,
} from "../controller/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

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
userRoute.put("/update/profile", authMiddleware, updateUserProfileController);
/**
 * @swagger
 * /user/delete/:id:
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
userRoute.get("/get-me", authMiddleware, deleteUserController);

export default userRoute;
