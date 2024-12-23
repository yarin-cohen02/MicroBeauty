const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "sources",
    {
      source_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      source_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "sources",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "sources_pkey",
          unique: true,
          fields: [{ name: "source_id" }],
        },
      ],
    }
  );
};
