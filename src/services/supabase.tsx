
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pjybmyyyvosfahjenfai.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeWJteXl5dm9zZmFoamVuZmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1NzY0MDksImV4cCI6MjAxMzE1MjQwOX0.w7g8klsmf9nSgcalFPlY9bNHie2HZj4M21NW6Bxn6Uw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase