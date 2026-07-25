import { createClient } from "@supabase/supabase-js"


const supabaseUrl =
"https://tsgngcspuqeobaxrancc.supabase.co"


const supabaseAnonKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZ25nY3NwdXFlb2JheHJhbmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5Mjg0NDAsImV4cCI6MjEwMDUwNDQ0MH0.-rivInnz2wQCkP5S-PhD-0fRp-FbjTUYIxYo0DDg1NI"


export const supabase =
createClient(
  supabaseUrl,
  supabaseAnonKey
)