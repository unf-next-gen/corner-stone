"use server";

import { createServerClient } from "@/app/global/util/supabase/server";

export default async function LoginUser(formData: FormData) {
  const signInCreds = {
    userName: formData.get("username") as string,
    password: formData.get("password") as string
  }

  try {
    const client = await createServerClient();
    const { data, error } = await client.auth.signInWithPassword({
      email: signInCreds.userName,
      password: signInCreds.password,
    })
    if (error) {
      throw new Error("Oops, there was an error while trying to login", error);
    } else if (!data.user) {
      throw new Error("Didn't find")
    }
    console.log(data)
    return data.user;
  } catch (error) {
    console.error("There was an error", error);
  }
}
