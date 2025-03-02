import { FormState, LoginFormSchema } from "@/actions/type";
import { post } from "@/lib/api";
import { ApiResponse } from "./type";

export const signIn = async (previousState: FormState, formData: FormData): Promise<FormState> => {
  const validateFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success)
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  return await post<ApiResponse<{ email: string; name: string }>>("/auth/sign-in", validateFields.data);
};
