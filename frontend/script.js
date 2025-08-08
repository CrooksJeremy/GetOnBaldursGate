// Import the Supabase client from your local config file
import { supabase } from '../supabaseClient.js';

// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('vote-form');         // The vote form
  const voteList = document.getElementById('vote-list');     // Table body for listing votes

  // Function to load votes from Supabase and display them
  async function loadVotes() {
    const { data, error } = await supabase.from('votes').select('*');

    if (error) {
      console.error('Error loading votes:', error);
      return;
    }

    // Clear the existing list before reloading
    voteList.innerHTML = '';

    // Loop through each vote and display in the table
    data.forEach(vote => {
      const row = document.createElement('tr');

      // Columns: Name, Day, Time
      row.innerHTML = `
        <td>${vote.name}</td>
        <td>${vote.day}</td>
        <td>${vote.time}</td>
        <td><button data-id="${vote.id}" class="delete-btn">Delete</button></td> <!-- Delete button with data-id -->
      `;

      voteList.appendChild(row);
    });
  }

  // Handle form submission to add a new vote
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get values from form fields
    const name = document.getElementById('name').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;

    // Insert new vote into Supabase
    const { error } = await supabase.from('votes').insert([{ name, day, time }]);

    if (error) {
      console.error('Error submitting vote:', error);
      return;
    }

    form.reset();     // Reset the form after submission
    loadVotes();      // Reload the vote list
  });

  // Event delegation: handle clicks on any delete button
  voteList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.getAttribute('data-id');

      // Delete the vote by its unique ID from Supabase
      const { error } = await supabase.from('votes').delete().eq('id', id);

      if (error) {
        console.error('Error deleting vote:', error);
        return;
      }

      loadVotes(); // Refresh the vote list after deletion
    }
  });

  // Initial load of all votes when page loads
  loadVotes();
});