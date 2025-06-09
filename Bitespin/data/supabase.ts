import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://rpyvxvhvdgiueujbljji.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweXZ4dmh2ZGdpdWV1amJsamppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODg0NTEsImV4cCI6MjA2NTA2NDQ1MX0.PSiqnniPiAdVmIjHkhWcKQcJGGUIz4_NVG0b1ZmetyI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
