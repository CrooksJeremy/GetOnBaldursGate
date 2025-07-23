const votes = []; // In-memory array to store vote objects

// Function to retrieve all stored votes
function getVotes() {
  return votes; // Return the votes array
}

// Function to add a new vote to the array
function addVote(vote) {
  votes.push(vote); // Add the vote object to the array
}

// Export the functions so they can be used in other files
module.exports = {
  getVotes,
  addVote,
};
