const customerService = require("../services/customerService");

exports.getCustomersByQuery = async (req, res) => {
  try {
    const query = req.query.query;
    const customers = await customerService.getCustomersByQuery(query);

    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(
      req.params.id,
      req.body
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};


