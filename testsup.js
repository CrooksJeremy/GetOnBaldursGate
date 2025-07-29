const supabase = require('./supabaseClient.js');



async function loadVotes() {
  let { data, error } = await supabase
    .from('Vote')
    .select('*');
  
  if (error) {
    console.error('Error loading votes:', error);
    return [];
  }
  
  return data;
}

console.log('Loading votes...');
loadVotes().then(votes => {
  console.log('Votes loaded:', votes);
}).catch(error => {
  console.error('Error:', error);
});