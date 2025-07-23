// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the form and vote list elements
  const form = document.getElementById('vote-form');
  const voteList = document.getElementById('vote-list');
  const API_BASE = 'http://localhost:3001/api/votes'; // Base URL for the API

  // Function to fetch and display the current list of votes
  async function loadVotes() {
    const res = await fetch(API_BASE); // Send GET request to fetch votes
    const votes = await res.json(); // Parse response as JSON
    voteList.innerHTML = ''; // Clear existing rows in the vote list

    // Loop through each vote and add a new row to the table
    votes.forEach(({ name, day, time }) => {
      const row = document.createElement('tr'); // Create a new table row
      row.innerHTML = `<td>${name}</td><td>${day}</td><td>${time}</td>`; // Insert vote data into the row
      voteList.appendChild(row); // Add the row to the vote list
    });
  }

  // Event listener for form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get input values from the form
    const name = document.getElementById('name').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;

    // Send POST request to submit the new vote
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Send data as JSON
      body: JSON.stringify({ name, day, time }), // Convert vote data to JSON string
    });

    form.reset(); // Clear the form inputs
    loadVotes(); // Reload the vote list to include the new vote
  });

  loadVotes(); // Load the vote list when the page first loads
});
