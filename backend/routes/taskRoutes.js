// Import the express module
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the taskController module
const taskController = require("../controllers/taskController");

// Import the verifyToken middleware
const verifyToken = require("../middlewares/authMiddleware");

// Route for getting all tasks
// GET /tasks
// Requires authentication (verifyToken middleware)
router.get("/tasks", verifyToken, taskController.getAllTasks);

// Route for getting a task by ID
// GET /tasks/:id
// Requires authentication (verifyToken middleware)
router.get("/tasks/:id", verifyToken, taskController.getTaskById);

// Route for creating a new task
// POST /tasks
// Requires authentication (verifyToken middleware)
router.post("/tasks", verifyToken, taskController.createTask);

// Route for updating a task
// PUT /tasks/:id
// Requires authentication (verifyToken middleware)
router.put("/tasks/:id", verifyToken, taskController.updateTask);

// Route for deleting a task
// DELETE /tasks/:id
// Requires authentication (verifyToken middleware)
router.delete("/tasks/:id", verifyToken, taskController.deleteTask);

// Export the router
module.exports = router;
