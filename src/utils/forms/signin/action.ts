"use server";

import { signIn } from "@/utils/auth";
import { signInSchema } from "@/utils/forms/signin/schema";
import type { FormState } from "@/utils/forms/signin/types";

export default async function signInAction(
  initialState: FormState,
  formData: FormData
): Promise<FormState> {
  // Validating user credentials

  const parsedForm = signInSchema.safeParse(Object.fromEntries(formData));

  if (!parsedForm.success) {
    // Invalid credentials
    return {
      password: {
        value: formData.get("password") as string,
        error: parsedForm.error.flatten().fieldErrors.password?.[0] ?? null,
      },
      email: {
        value: formData.get("email") as string,
        error: parsedForm.error.flatten().fieldErrors.email?.[0] ?? null,
      },
      state: "error",
      message: "Invalid credentials",
    };
  }
  
  return {
    password: {
      value: formData.get("password") as string,
      error: null,
    },
    email: {
      value: formData.get("email") as string,
      error: null,
    },
    state: "success",
    message: "Login successful",
  };
}
