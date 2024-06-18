import { createClient } from '@/utils/supabase/client'

export const getProfile = async (user) => {
    // Supabase initialize
    const supabase = createClient()
  
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`full_name, username, bio, avatar_url`)
      .eq('id', user)
      .single()
  
    if (error && status !== 406) {
      throw error
    }
  
    return data
  }
  