const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customers", // This is the model name (table name is pluralized by default)
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
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Date of birth must be a valid date.",
          },
        },
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
            msg: "Israeli ID must contain only numeric characters.",
          },
          len: {
            args: [9, 9],
            msg: "Israeli ID must be exactly 9 digits.",
          },
          isValidIsraeliId(value) {
            const isValid = validateIsraeliId(value);
            if (!isValid) {
              throw new Error("Invalid Israeli ID number.");
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

  return Customer;
};

// Helper function for validating Israeli ID
function validateIsraeliId(id) {
  if (!/^\d{9}$/.test(id)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = parseInt(id[i], 10) * ((i % 2) + 1);
    if (num > 9) num -= 9;
    sum += num;
  }
  return sum % 10 === 0;
}
