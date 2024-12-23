const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "treatments",
    {
      treatment_type_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      treatment_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "treatments",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "treatments_pkey",
          unique: true,
          fields: [{ name: "treatment_type_id" }],
        },
      ],
    },
  );
};
