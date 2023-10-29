import { ILogin } from "../moduls";
import supabase from "./supabase";

export const login = async ({ loginEmail, loginPassword }: ILogin) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password: loginPassword,
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
};
