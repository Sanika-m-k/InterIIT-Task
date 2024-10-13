import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gxytxyzpyalvfqbuvzuj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4eXR4eXpweWFsdmZxYnV2enVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2Nzc5NzgsImV4cCI6MjA0NDI1Mzk3OH0.M1NWEIudWvFLNRAxJ0tkjexTe-b8Pym6hiGsHqTTLzg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;