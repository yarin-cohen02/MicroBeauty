const dashboardService = require("../services/dashboardService.js");

exports.getDashboardData = async (req, res) => {
  try {
    const filter = req.query.filter || "monthly";
    const data = await dashboardService.getDashboardData(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};