export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if the token exists and starts with 'Bearer '
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }

  // Extract the token value
  const tokenValue = token.replace("Bearer ", "");

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(tokenValue, SECRET_KEY);

    // Add the decoded token to the request object for further use
    req.user = decodedToken;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return an error response
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
