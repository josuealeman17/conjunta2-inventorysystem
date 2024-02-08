import { createClient } from '@supabase/supabase-js';

// To be more secure: .env file. 
const supabaseURL = "https://xwpqlrnarmddqajgswjx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cHFscm5hcm1kZHFhamdzd2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczMTg0MDEsImV4cCI6MjAyMjg5NDQwMX0.oFNUQudV77AD9n-hdzaVhe3J2Xn10M989mETVD8Jx5A";

export const supabase = createClient(supabaseURL, supabaseAnonKey);