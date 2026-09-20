import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oqbqasltqtzekqllswsp.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYnFhc2x0cXR6ZWtxbGxzd3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3ODE4MDIsImV4cCI6MjEwNTM1NzgwMn0.0GMXyqY6NbM8ahnxBJDBgqbwmfYlN3YPAMuTkLGS0sk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
