const { Op } = require("sequelize");
const customers = require("../models/customers");

exports.getCustomersByQuery = (query) => {
  return customers.findAll({
    where: {
      [Op.or]: [
        // Search in first name
        { first_name: { [Op.iLike]: `%${query}%` } },
        // Search in last name
        { last_name: { [Op.iLike]: `%${query}%` } },
        // Search in mobile number (handle "054" -> "+97254")
        {
          mobile_number: {
            [Op.iLike]: `%${query.replace(/^0/, "+972")}%`,
          },
        },
        // Search in full name (concatenate first and last names)
        {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn(
                "concat",
                Sequelize.col("first_name"),
                " ",
                Sequelize.col("last_name"),
              ),
              {
                [Op.iLike]: `%${query}%`,
              },
            ),
          ],
        },
        // Search in notes
        { notes: { [Op.iLike]: `%${query}%` } },
      ],
    },
  });
};

exports.getCustomerById = (id) => {
  return customers.findByPk(id);
};

exports.createCustomer = (customer) => {
  return customers.create(customer);
};

exports.updateCustomer = (id, customer) => {
  return customers.update(customer, { where: { customer_id: id } });
};

exports.deleteCustomer = (id) => {
  return customers.destroy({ where: { customer_id: id } });
};
