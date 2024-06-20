const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToDB = require("./db");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDB();

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow these headers
}));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Example routes - adjust as per your actual routes
app.use('/api/', require("./Routes/createUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api/', require("./Routes/OrderData"));

// Error handling middleware (if needed)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
