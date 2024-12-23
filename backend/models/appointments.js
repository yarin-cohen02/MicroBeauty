const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "appointments",
    {
      appointment_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "customer_id",
        },
      },
      appointment_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "appointment_types",
          key: "appointment_type_id",
        },
      },
      appointment_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrived: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      price_for_appointment: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "appointments",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "appointments_pkey",
          unique: true,
          fields: [{ name: "appointment_id" }],
        },
      ],
    },
  );
};
