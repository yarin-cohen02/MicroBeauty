const express = require("express");
const reportsController = require("../controllers/reportsController.js");

const router = express.Router();

router.get("/customers", reportsController.customersReport);
router.get("/appointments", reportsController.appointmentsReport);
router.get("/incomes", reportsController.incomesReport);

module.exports = router;