import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nnbasurpwlcgysytqbfs.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uYmFzdXJwd2xjZ3lzeXRxYmZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MzY5MzcsImV4cCI6MjA2MTQxMjkzN30.u66BTwlSfSEeydDgMufnj2SObOstmofyQaKkXp6ccow';

export const supabase = createClient(supabaseUrl, supabaseKey);
