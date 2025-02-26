const express = require("express");
const dashboardController = require("../controllers/dashboardController.js");

const router = express.Router();

router.get("/", dashboardController.getDashboardData);

module.exports = router;
