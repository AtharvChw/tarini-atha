import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Null when env is missing -> the app falls back to local data.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;