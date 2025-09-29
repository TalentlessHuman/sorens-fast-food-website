require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


// Connect to the Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Middleware
app.use(cors());
app.use(express.json()); // This allows the server to accept JSON data in the body of requests


// 👇 Add this line to serve static files
app.use('/uploads', express.static('uploads'));

// A simple test route to check if the server is running
app.get('/', (req, res) => res.send('Soren\'s Fast Foods API is running!'));

// Define the main API Routes
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // 👈 Add this line
// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));