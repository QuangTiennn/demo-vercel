import { Router } from "express";
import { loginController, registerController } from "../controller";

// Initialization
const authRoute = Router();

// Requests
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register account
 *     description: register account
 *     tags : [Auth]
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
authRoute.post("/register", registerController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login
 *     description: login
 *     tags : [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
authRoute.post("/login", loginController);

export default authRoute;
