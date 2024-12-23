const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "contracts",
    {
      contract_id: {
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
      signature_image: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      time_signed: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_allergic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      allergic_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_disease: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      disease_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_herpes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      herpes_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_slow_healing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      slow_healing_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_pregnant: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      pregnant_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_pills: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      pills_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_drugs: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      drugs_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "contracts",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "contracts_pkey",
          unique: true,
          fields: [{ name: "contract_id" }],
        },
      ],
    }
  );
};
