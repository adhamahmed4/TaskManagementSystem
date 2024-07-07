// Import the required modules and the connection pool
const { sql, poolPromise } = require("../config/dbConfig");

// Get a user by username from the database
const getUserByUsername = async (username) => {
  try {
    // Get the connection pool
    const pool = await poolPromise;
    // Execute the SQL query to fetch a user by username
    const result = await pool
      .request()
      .input("username", sql.VarChar, username) // Set the input parameter for the username
      .query("SELECT * FROM users WHERE username = @username");
    // Return the first record from the recordset (the user)
    return result.recordset[0];
  } catch (error) {
    // Throw the error for further handling
    throw error;
  }
};

// Create a new user in the database
const createUser = async (user) => {
  try {
    // Destructure the user object
    const { username, password } = user;
    // Get the connection pool
    const pool = await poolPromise;
    // Execute the SQL query to insert a new user
    await pool
      .request()
      .input("username", sql.VarChar, username) // Set the input parameter for the username
      .input("password", sql.VarChar, password) // Set the input parameter for the password
      .query(
        "INSERT INTO users (username, password) VALUES (@username, @password)"
      );
  } catch (error) {
    // Throw the error for further handling
    throw error;
  }
};

// Export the functions
module.exports = {
  getUserByUsername,
  createUser,
};
