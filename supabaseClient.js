// supabaseClient.js
const supabaseClient = require('@supabase/supabase-js');

const supabaseUrl = 'https://abwjgstgzlhvvjynhfly.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid2pnc3RnemxodnZqeW5oZmx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzgwNTA3NCwiZXhwIjoyMDY5MzgxMDc0fQ.D38dqLAnRjC-2_6oWNhNjcmSZgV7X8GQCUto57E_H94'

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

module.exports = supabase;
