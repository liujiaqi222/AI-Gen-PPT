"use server";

import { BACKEND_URL } from "@/lib/constants";
import { FormState,  SignupFormSchema } from "./type";
import { redirect } from "next/navigation";

export async function signUp(_state: FormState, formData: FormData): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }
  console.log(`${BACKEND_URL}/auth/sign-up`);
  const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/sign-in");
  }
  return {
    message: response.status === 409 ? "The use is already exited" : response.statusText,
  };
}

