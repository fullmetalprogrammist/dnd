import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://yvcqewbkyobltjfxxdfs.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY

// export const spb = createClient(supabaseUrl, supabaseKey);
export const spb = createClient(
  "https://yvcqewbkyobltjfxxdfs.supabase.co", 
  "sb_publishable_2v5Eb4f8RkYR14mMPYv14Q_hFUHyP3I"
  // "sb_secret_d3munU5aG8GxVVdoyELA4g_w4FYWmOl"
);