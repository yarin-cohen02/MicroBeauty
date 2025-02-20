const express = require("express");
const customerController = require("../controllers/customerController");

const router = express.Router();

router.get("/", customerController.getCustomersByQuery); //  api/customers?query=John
router.get("/:id", customerController.getCustomerById); //  api/customers/123
router.post("/", customerController.createCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
