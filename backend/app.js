const express = require("express");
const cors = require("cors");

const customersRoutes = require("./routes/customerRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");

const sequelize = require("./models/sequelize");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Customers Management System API!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API ROUTES
app.use("/api/customers", customersRoutes);
app.use("/api/appointments", appointmentsRoutes);

module.exports = app;
