const customerModel = require("../models/customerModel");

exports.getAllCustomers = async () => {
  return await customerModel.findAll();
};

exports.getCustomerById = async (id) => {
  return await customerModel.findById(id);
};

// exports.createCustomer = async (customerData) => {
//   return await customerModel.create(customerData);
// };
