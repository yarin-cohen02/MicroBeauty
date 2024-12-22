require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

require('./services/reminderService');
const PORT = process.env.PORT || 5001;

// Test DB Connection and Start Server
(async () => {
    try {
      await sequelize.authenticate();
      console.log("Database connected successfully!");
  
      // Sync models with DB (optional for development)
      await sequelize.sync({ alter: true });
  
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(1);
    }
  })();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });