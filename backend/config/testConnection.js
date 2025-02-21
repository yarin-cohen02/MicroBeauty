// const sequelize = require("../utils/sequelize");
// require("dotenv").config();

// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   } finally {
//     await sequelize.close(); // Close the connection after testing
//   }
// };

import pool from "./poolConfig.js"; 

const testDBConnection = async () => {
  try {
    const start = Date.now();
    await pool.query("SELECT 1");
    console.log(`DB connection time: ${Date.now() - start}ms`);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await pool.end(); // Close the pool connection after testing
  }
};

// console.log(pool);
testDBConnection();
