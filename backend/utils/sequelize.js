const { Sequelize } = require("sequelize");
const sequelizeConfig = require("../config/sequelizeConfig");
require("dotenv").config();

// Determine the environment (default to development)
const env = process.env.NODE_ENV || "development";
const config = sequelizeConfig[env];

// Initialize Sequelize with the environment-specific config
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging || console.log, // Enable logging (can be disabled in production)
  },
);

module.exports = sequelize;
