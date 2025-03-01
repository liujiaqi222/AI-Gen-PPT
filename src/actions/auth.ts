"use server";

import { BACKEND_URL } from "@/lib/constants";
import { FormState, LoginFormSchema, SignupFormSchema } from "./type";
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

export const signIn = async (previousState: FormState, formData: FormData): Promise<FormState> => {
  const validateFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success)
    return {
      error: validateFields.error.flatten().fieldErrors,
    };

  const res = await fetch(`${BACKEND_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validateFields.data),
  });

  if (res.ok) {
    const result = await res.json();
    console.log({ result });
    return {}
  }
  return {message:res.status === 401 ? "Invalid Credentials" : res.statusText}
};
