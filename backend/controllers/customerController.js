const customerService = require("../services/customerService");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};
