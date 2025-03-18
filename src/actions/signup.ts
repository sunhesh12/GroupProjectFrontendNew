"use server";

import { user } from "@/utils/backend";
import { signUpSchema } from "@/utils/schema";

export default async function signup(formData: FormData) {
  // Checking for form validation error
  const parsedForm = await signUpSchema.safeParseAsync(
    Object.fromEntries(
      formData.entries().map(([key, value]) => {
        return key === "age" ? [key, Number(value)] : [key, value];
      })
    )
  );

  if (!parsedForm.success) {
    console.log(parsedForm.error);
  } else {
    const result = await user.auth.signup(formData);
    console.log(result);
  }
}
