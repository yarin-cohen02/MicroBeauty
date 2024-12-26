const express = require("express");
const customerController = require("../controllers/customerController");

const router = express.Router();

// Routes
router.get("/", customerController.getCustomersByQuery); // Example: GET /customers?query=John
router.get("/:id", customerController.getCustomerById); // Example: GET /customers/123
router.post("/", customerController.createCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
