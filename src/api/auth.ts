import { FormState, LoginFormSchema } from "@/actions/type";
import { post } from "@/lib/api";

export const signIn = async (previousState: FormState, formData: FormData): Promise<FormState> => {
  const validateFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success)
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  const res = await post("/auth/sign-in", validateFields.data);

  console.log(res);
  if (res.ok) {
    const result = await res.json();
    console.log(result);
    return {};
  }
  return { message: res.status === 401 ? "Invalid Credentials" : res.statusText };
};
