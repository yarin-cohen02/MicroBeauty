const express = require("express");
// const cors = require("cors");

const customersRoutes = require("./routes/customerRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");

const sequelize = require("./models/sequelize");

const app = express();

// app.use(cors());
app.use(express.json());

app.use("/api/customers", customersRoutes); 
app.use("/api/appointments", appointmentsRoutes);

module.exports = app;
