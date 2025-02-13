const { Sequelize } = require("sequelize");
const config = require("../config/sequelizeConfig"); 
const customersModel = require("./customers");
const appointmentsModel = require("./appointments");
const app = require("../app");

const environment = process.env.NODE_ENV || "development"; 
const configOptions = config[environment];  

const sequelize = new Sequelize(configOptions);

const customers = customersModel(sequelize, Sequelize.DataTypes);
const appointments = appointmentsModel(sequelize, Sequelize.DataTypes);

module.exports = { sequelize, customers, appointments };
