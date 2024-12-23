const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "cities",
    {
      city_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      city_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cities",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "cities_pkey",
          unique: true,
          fields: [{ name: "city_id" }],
        },
      ],
    }
  );
};
