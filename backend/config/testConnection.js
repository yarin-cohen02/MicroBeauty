const sequelize = require("../utils/sequelize");
require('dotenv').config();

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close(); // Close the connection after testing
  }
};

testConnection();
