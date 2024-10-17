import SupabaseClient from "@/utils/supabase";

export async function buyproduct(token, { product_id }) {
    const supabase = await SupabaseClient(token);
    
    const {data,error} = await supabase.
    from("mobilesname").
    select("*,orders: orders(*)").
    eq("id",product_id).single()
    if(error){
        console.log(error);
        return null;
    }
    return data;
}
