const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware to allow cross-origin requests
const path = require('path'); // Node.js utility for handling file paths
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client
const prisma = new PrismaClient(); // Initialize Prisma Client

const app = express(); // Create an Express application

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

const votesRouter = require('./routes/votes'); // Import the votes route module

app.use('/api/votes', votesRouter); // Mount the votes router under /api/votes
app.use('/frontend', express.static(path.join(__dirname, '..', 'frontend'))); 
// Serve static frontend files from the /frontend directory

const PORT = process.env.PORT || 3001; // Use the port from environment variables or default to 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log a message when the server starts
});
