// Import required modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Register a new user
const register = async (req, res) => {
  try {
    // Destructure username and password from request body
    const { username, password } = req.body;

    // Hash the password using bcrypt with a salt round of 8
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a new user in the database
    await userModel.createUser({ username, password: hashedPassword });

    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Authenticate a user and generate a JWT token
const login = async (req, res) => {
  try {
    // Destructure username and password from request body
    const { username, password } = req.body;

    // Get the user from the database by username
    const user = await userModel.getUserByUsername(username);

    // If no user is found, send a 404 response
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    // Compare the provided password with the stored hashed password
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    // If the password is invalid, send a 401 response
    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null });
    }

    // Generate a JWT token with the user's ID and a secret key
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // Token expires in 24 hours
    });

    // Send a success response with the JWT token
    res.status(200).json({ auth: true, token });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Export the register and login functions
module.exports = {
  register,
  login,
};
