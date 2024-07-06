// Import required modules
const sql = require("mssql");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Define configuration options for SQL Server connection
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Enable encryption
    trustServerCertificate: true, // Trust self-signed certificate
    enableArithAbort: true, // Improve arithmetic operations
  },
};

// Create a connection pool and handle connection events
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed:", err);
    process.exit(1); // Exit the process with a non-zero code
  });

// Export the required modules and the connection pool
module.exports = {
  sql,
  poolPromise,
};
