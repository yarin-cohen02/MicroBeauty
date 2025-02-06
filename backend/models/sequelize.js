const { Sequelize } = require("sequelize");
const config = require("../config/sequelizeConfig");  // Importing configuration
const customersModel = require("./customers"); // Import the customer model

// Load environment-specific configuration (e.g., development or production)
const environment = process.env.NODE_ENV || "development"; 
const configOptions = config[environment];  // Use the right environment configuration

// Create Sequelize instance with connection options
const sequelize = new Sequelize(configOptions);

// Initialize models
const customers = customersModel(sequelize, Sequelize.DataTypes);

// Export models and Sequelize instance
module.exports = { sequelize, customers };
