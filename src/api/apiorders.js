import SupabaseClient from "@/utils/supabase";

export async function buyproduct(token, { product_id, user_id }) {
    const supabase = await SupabaseClient(token);
    
    const {data,error} = await supabase.
    from("mobilesnames").
    select("*,orders: orders(*)").
    eq("Name",product_id).single()
    if(error){
        console.log(error);
        return null;
    }
    return data;
}
