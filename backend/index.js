const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToDB = require("./db");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDB();

// Middleware
app.use(express.json());

// Dynamic CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
 "https://my-app-1-koh3.onrender.com/",
  "https://appforfood.netlify.app", 
  `${process.env.REACT_APP_API_URL}`
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Example routes - adjust as per your actual routes
app.use("/api/", require("./functions/createUser"));
app.use("/api/", require("./functions/DisplayData"));
app.use("/api/", require("./functions/OrderData"));

// Error handling middleware (if needed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

