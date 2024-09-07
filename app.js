const express = require("express");
const app = express();
const cors = require("cors");
const limiter = require("./middlewares/rateLimiter");
require("dotenv/config"); // Load environment variables

// Importing routes
const authRoutes = require("./routes/auth");


// Middlewares
app.use(cors({
  origin: process.env.APP_URL,
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(limiter);

// Route Middlewares
app.use("/api/user", authRoutes);

// Import Sequelize instance from db.js
const { sequelize, connectDB, syncModels } = require("./db");

// Connect to Database and Sync Models
connectDB();
syncModels();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Application running at http://localhost:${process.env.PORT}/`);
});
