// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");

// Load env vars
dotenv.config();

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);

// Connect to DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Auth Routes (to be added soon)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
