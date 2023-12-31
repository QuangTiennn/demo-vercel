import { Router } from "express";
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  registerController,
  sendOTPController,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  changePasswordValidate,
  forgotPasswordValidate,
  loginValidate,
  registerValidate,
  sendOTPValidate,
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
 *               code:
 *                 type: string
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

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: send otp
 *     description: send otp
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
 *     responses:
 *       200:
 *         description: Successful operation
 */
authRoute.post("/send-otp", validate(sendOTPValidate), sendOTPController);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: forgot password
 *     description: forgot password
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
 *               code:
 *                 type : string
 *     responses:
 *       200:
 *         description: Successful operation
 */
authRoute.post(
  "/forgot-password",
  validate(forgotPasswordValidate),
  forgotPasswordController
);

/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     summary: forgot password
 *     description: forgot password
 *     tags : [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               old_password:
 *                 type : string
 *     responses:
 *       200:
 *         description: Successful operation
 */
authRoute.put(
  "/change-password",
  authMiddleware,
  validate(changePasswordValidate),
  changePasswordController
);

export default authRoute;
