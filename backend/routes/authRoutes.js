// Import the express module
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the authController module
const authController = require("../controllers/authController");

// Route for user registration
// POST /register
router.post("/register", authController.register);

// Route for user login
// POST /login
router.post("/login", authController.login);

// Export the router
module.exports = router;
