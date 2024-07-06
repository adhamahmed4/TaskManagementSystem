// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware

// Import route modules
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Load environment variables from .env file
dotenv.config();

// Create an Express app instance
const app = express();

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Configure CORS
app.use(
  cors({
    origin: "*", // Replace with the origin(s) you want to allow
  })
);

// Mount authentication routes at /api/auth
app.use("/api/auth", authRoutes);

// Mount task routes at /api
app.use("/api", taskRoutes);

// Get the port from the environment variable or use 3001 as the default
const port = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
