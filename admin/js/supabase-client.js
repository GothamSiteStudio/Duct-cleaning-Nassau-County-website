// ============================================
// Supabase Client Configuration
// ============================================
// INSTRUCTIONS:
// 1. Go to https://supabase.com and create a free project
// 2. Go to Settings > API
// 3. Copy your Project URL and anon/public key
// 4. Paste them below
// ============================================

const SUPABASE_URL = 'https://zbxvfetehxlpvjqsxvru.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieHZmZXRlaHhscHZqcXN4dnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NTA5NTMsImV4cCI6MjA5MDEyNjk1M30.RhqopSBwlSHKEfiZXoR-G1Eqlky0nHH4nvyxlD6GHKI';

// Initialize Supabase client (loaded via CDN in HTML)
// Use 'db' to avoid conflict with the global 'supabase' namespace from the CDN
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
