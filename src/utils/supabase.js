import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


const SupabaseClient = async(supabaseAccessToken)=>{
    const supabase = createClient(supabaseUrl, supabaseKey,{

            }
        }
    });
    return supabase;
}

export default SupabaseClient
        
