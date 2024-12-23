const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "appointment_types",
    {
      appointment_type_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "appointment_types",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "appointment_types_pkey",
          unique: true,
          fields: [{ name: "appointment_type_id" }],
        },
      ],
    }
  );
};
