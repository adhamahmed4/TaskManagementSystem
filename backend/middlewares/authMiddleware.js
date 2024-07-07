// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");

// Middleware function to verify the JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the "x-access-token" header
  const token = req.headers["x-access-token"];

  // If no token is provided, send a 403 Forbidden response
  if (!token) {
    return res.status(403).json({ auth: false, message: "No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded user ID to the request object
    req.userId = decoded.id;

    // Call the next middleware function
    next();
  } catch (err) {
    // If the token is invalid or expired, send a 500 Internal Server Error response
    return res
      .status(500)
      .json({ auth: false, message: "Failed to authenticate token." });
  }
};

// Export the verifyToken middleware function
module.exports = verifyToken;
