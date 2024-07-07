// /backend/controllers/taskController.js

const taskModel = require("../models/taskModel");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.getTaskById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    await taskModel.createTask(req.body);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  try {
    await taskModel.updateTask(req.params.id, req.body);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    await taskModel.deleteTask(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Helper function to handle errors and send an error response
const handleError = (res, error) => {
  res.status(500).json({ message: error.message });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
