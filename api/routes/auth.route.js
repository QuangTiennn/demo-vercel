import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controller/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  loginValidate,
  registerValidate,
} from "../validations/auth.validation.js";

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
authRoute.post("/register", validate(registerValidate), registerController);

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
authRoute.post("/login", validate(loginValidate), loginController);

export default authRoute;
