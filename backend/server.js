const app = require("./app");
const sequelize = require("./utils/sequelize");
const pool = require('./pool');

// require("./services/reminderService");
const PORT = process.env.PORT || 5001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
