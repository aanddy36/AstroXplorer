import supabase from "./supabase";

export const getTours = async () => {
  let { data: tours, error } = await supabase.from("tours").select("*");
  if(error){
    console.error(error);
    throw new Error("")
  }
  return tours
};
