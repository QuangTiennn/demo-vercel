import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../constants/common.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { handleErrorResponse } from "../helpers/response.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // Check if the token exists and starts with 'Bearer '
    if (!token || !token.startsWith("Bearer ")) {
      return handleErrorResponse(
        res,
        MESSAGES.AUTH_REQUIRED,
        STATUS_CODE.UNAUTHORIZED
      );
    }

    // Extract the token value
    const tokenValue = token.replace("Bearer ", "");

    // Verify the token using the secret key
    const decodedToken = jwt.verify(tokenValue, "laskjdefaksdherusdlak");

    // Add the decoded token to the request object for further use
    req.user = decodedToken;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return an error response
    return handleErrorResponse(res, error.message);
  }
};
