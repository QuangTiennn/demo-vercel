import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadImageController } from "../controller/file.controller";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const multerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname.replace(" ", "_"));
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fieldSize: 1024 },
});

// Initialization
const fileRoute = Router();

// Requests
/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: upload file
 *     description: upload file
 *     tags : [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *               file:
 *                  type: array
 *                  items:
 *                      type: string
 *                      format: binary
 *
 *     responses:
 *       200:
 *         description: Successful operation
 */
fileRoute.post("/upload/", upload.single("file"), uploadImageController);

export default fileRoute;

// parameters:
//  *        - in: path
//  *          name: prefix
//  *          schema:
//  *            type: string
//  *            required: true
//  *            description: folder name
