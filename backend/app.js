const express = require("express");
const cors = require("cors");
const customersRoutes = require("./routes/customerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customersRoutes); // Customers routes

module.exports = app;
