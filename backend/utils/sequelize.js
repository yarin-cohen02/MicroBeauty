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
    logging: config.logging || console.log
  },
);

module.exports = sequelize;
