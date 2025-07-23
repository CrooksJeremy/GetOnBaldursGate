const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client
const prisma = new PrismaClient(); // Instantiate Prisma Client

// Get all votes
router.get('/', async (req, res) => {
  try {
    // Fetch all votes from the database, sorted by creation date (newest first)
    const votes = await prisma.vote.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(votes); // Send votes as JSON response
  } catch (err) {
    // Handle errors by sending a 500 status with error message
    res.status(500).json({ error: 'Failed to fetch votes.' });
  }
});

// Submit a vote
router.post('/', async (req, res) => {
  const { name, day, time } = req.body; // Extract data from the request body

  // Check if any required field is missing
  if (!name || !day || !time) {
    return res.status(400).json({ error: 'Missing fields' }); // Send 400 if validation fails
  }

  try {
    // Create a new vote entry in the database
    const newVote = await prisma.vote.create({
      data: { name, day, time },
    });
    res.status(201).json(newVote); // Respond with the created vote and 201 status
  } catch (err) {
    // Handle errors by sending a 500 status with error message
    res.status(500).json({ error: 'Failed to save vote.' });
  }
});

module.exports = router; // Export the router to be used in the main server
