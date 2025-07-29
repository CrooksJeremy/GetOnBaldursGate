// main.js
const supabase = require('../supabaseClient.js');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('vote-form');
  const voteList = document.getElementById('vote-list');

  // Load and display votes from Supabase
  async function loadVotes() {
    const { data: votes, error } = await supabase
      .from('Vote') // ← match table name (case-sensitive if quoted in schema)
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error loading votes:', error.message);
      return;
    }

    voteList.innerHTML = ''; // Clear existing rows

    votes.forEach(({ name, day, time }) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${name}</td><td>${day}</td><td>${time}</td>`;
      voteList.appendChild(row);
    });
  }

  // Handle vote form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;

    const { error } = await supabase
      .from('Vote')
      .insert([{ name, day, time }]);

    if (error) {
      console.error('Error submitting vote:', error.message);
      return;
    }

    form.reset();
    loadVotes();
  });

  loadVotes(); // On page load
});
