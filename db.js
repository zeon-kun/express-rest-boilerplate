const { Sequelize } = require("sequelize");

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, // Disable SQL query logging, enable if needed
});

// Test connection to MySQL
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to MySQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Sync models with the database (creates tables if they don't exist)
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // `alter: true` will update schema without losing data
    console.log("Models synchronized with the database.");
  } catch (error) {
    console.error("Error syncing models with the database:", error);
  }
};

// Export Sequelize instance and helper functions
module.exports = { sequelize, connectDB, syncModels };
