var DataTypes = require("sequelize").DataTypes;
var _appointment_types = require("./appointment_types");
var _appointments = require("./appointments");
var _cities = require("./cities");
var _contracts = require("./contracts");
var _customers = require("./customers");
var _sources = require("./sources");
var _treatments = require("./treatments");

function initModels(sequelize) {
  var appointment_types = _appointment_types(sequelize, DataTypes);
  var appointments = _appointments(sequelize, DataTypes);
  var cities = _cities(sequelize, DataTypes);
  var contracts = _contracts(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var sources = _sources(sequelize, DataTypes);
  var treatments = _treatments(sequelize, DataTypes);

  appointments.belongsTo(appointment_types, {
    as: "appointment_type",
    foreignKey: "appointment_type_id",
  });
  appointment_types.hasMany(appointments, {
    as: "appointments",
    foreignKey: "appointment_type_id",
  });
  customers.belongsTo(cities, {
    as: "city",
    foreignKey: "city_id",
  });
  cities.hasMany(customers, {
    as: "customers",
    foreignKey: "city_id",
  });
  appointments.belongsTo(customers, {
    as: "customer",
    foreignKey: "customer_id",
  });
  customers.hasMany(appointments, {
    as: "appointments",
    foreignKey: "customer_id",
  });
  contracts.belongsTo(customers, {
    as: "customer",
    foreignKey: "customer_id",
  });
  customers.hasMany(contracts, {
    as: "contracts",
    foreignKey: "customer_id",
  });
  customers.belongsTo(sources, {
    as: "source",
    foreignKey: "source_id",
  });
  sources.hasMany(customers, {
    as: "customers",
    foreignKey: "source_id",
  });
  customers.belongsTo(treatments, {
    as: "treatment_type",
    foreignKey: "treatment_type_id",
  });
  treatments.hasMany(customers, {
    as: "customers",
    foreignKey: "treatment_type_id",
  });

  return {
    appointment_types,
    appointments,
    cities,
    contracts,
    customers,
    sources,
    treatments,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
