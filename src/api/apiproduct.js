import SupabaseClient from "@/utils/supabase";

export async function getproduct(token){
    const supabase = await SupabaseClient(token);
    let query = supabase.from("mobilesname").select("*")

    const {data,error} = await query;
    if(error){
        console.log(error);
        return null;
    }

    return data;

};


export async function getSingleProduct(token, { product_id }) {
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

export async function updateproductstaus(token, { product_id },instock) {
    const supabase = await SupabaseClient(token);
    
    const {data,error} = await supabase.
    from("mobilesname").
    update({instock}).
    eq("id",product_id).select();
    
    if(error){
        console.log(error);
        return null;
    }
    return data;
}


export async function addNewJob(token, _, productData) {
    const supabase = await SupabaseClient(token);
  
    const { data, error } = await supabase
      .from("mobilesname") // Assuming "mobilesname" is the table name
      .insert([productData]) // Insert the product data
  
    if (error) {
      console.log("Error inserting product:", error.message);
      return null;
    }
    return data;
  }
  
