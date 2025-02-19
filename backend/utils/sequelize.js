const { Sequelize } = require("sequelize");
const sequelizeConfig = require("../config/sequelizeConfig");

const env = process.env.NODE_ENV || "development";
const config = sequelizeConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect || "postgres",
    logging: config.logging || console.log,
    dialectOptions: {
      ssl: {
        require: true, // Ensure SSL connection
        rejectUnauthorized: false, // Disable certificate validation (can be true for stricter security)
      },
    },
  }
);

module.exports = sequelize;
