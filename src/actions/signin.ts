"use server";
import { signInSchema } from "@/utils/schema";
import type { SignInState } from "./types";
import { cookies } from "next/headers";
import { user } from "@/utils/backend";
import { redirect } from "next/navigation";

export default async function signInAction(
  previousState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const parsedForm = await signInSchema.safeParseAsync(
    Object.fromEntries(formData.entries())
  );

  if (parsedForm.success) {
    const cookieStore = await cookies();
    // Calling the sign in route

    const response = await user.auth.signin({
      email: parsedForm.data.email,
      password: parsedForm.data.password,
    });

    // When credentials doesent match
    if (response.status === 401) {
      return {
        status: "failiure",
        internalErrors: ["Username or the password are invalid"],
        email: {
          value: previousState.email.value,
          errors: null,
        },
        password: {
          value: previousState.password.value,
          errors: null,
        },
      };
    }

    // In case if any server error
    if (response.status === 500) {
      throw new Error("Server error has occured");
    }

    // Handling if no token issued
    if (!response.payload?.token) {
      throw new Error("Malformated response: Empty token");
    }

    // Setting the cookie with the access token
    cookieStore.set({
      name: "access_token",
      value: response.payload?.token,
      httpOnly: true,
      maxAge: 86400,
    });

    redirect("/app/dashboard");
  }

  return {
    status: "failiure",
    internalErrors: null,
    email: {
      value: previousState.email.value,
      errors: parsedForm.error.formErrors.fieldErrors.email as string[],
    },
    password: {
      value: previousState.password.value,
      errors: parsedForm.error.formErrors.fieldErrors.password as string[],
    },
  };
}