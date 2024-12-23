const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "customers",
    {
      customer_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\+9725\d{8}$/,
          notNull: {
            msg: "Mobile number is required.",
          },
          isValid(value) {
            if (!value.startsWith("+972")) {
              throw new Error("Mobile number must start with +972.");
            }
          },
        },
      },
      israeli_id: {
        type: DataTypes.CHAR(9),
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'Israeli ID must contain only numeric characters.',
          },
          len: {
            args: [9, 9],
            msg: 'Israeli ID must be exactly 9 digits.',
          },
          isValidIsraeliId(value) {
            const isValid = validateIsraeliId(value);
            if (!isValid) {
              throw new Error('Invalid Israeli ID number.');
            }
          },
        },
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cities",
          key: "city_id",
        },
      },
      treatment_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "treatments",
          key: "treatment_type_id",
        },
      },
      needle_and_color: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_black_list: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      agreed_ads: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      source_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "sources",
          key: "source_id",
        },
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "customers",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "customers_pkey",
          unique: true,
          fields: [{ name: "customer_id" }],
        },
      ],
    }
  );
};

function validateIsraeliId(id) {
  // Ensure the ID is 9 digits
  if (!/^\d{9}$/.test(id)) return false;

  // Checksum validation
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = parseInt(id[i], 10) * ((i % 2) + 1); // Multiply each digit alternately by 1 or 2
    if (num > 9) num -= 9; // Subtract 9 from numbers greater than 9
    sum += num;
  }
  return sum % 10 === 0; // Valid if the sum is divisible by 10
}