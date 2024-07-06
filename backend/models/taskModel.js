const { sql, poolPromise } = require("../config/dbConfig");

// Get all tasks from the database
const getAllTasks = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM tasks");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Get a task by ID from the database
const getTaskById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM tasks WHERE id = @id");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Create a new task in the database
const createTask = async (task) => {
  try {
    const { title, description, status } = task;
    const pool = await poolPromise;
    await pool
      .request()
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .input("status", sql.VarChar, status)
      .query(
        "INSERT INTO tasks (title, description, status, created_at, updated_at) VALUES (@title, @description, @status, GETDATE(), GETDATE())"
      );
  } catch (error) {
    throw error;
  }
};

// Update an existing task in the database
const updateTask = async (id, task) => {
  try {
    const { title, description, status } = task;
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .input("status", sql.VarChar, status)
      .query(
        "UPDATE tasks SET title = @title, description = @description, status = @status, updated_at = GETDATE() WHERE id = @id"
      );
  } catch (error) {
    throw error;
  }
};

// Delete a task from the database
const deleteTask = async (id) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM tasks WHERE id = @id");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
