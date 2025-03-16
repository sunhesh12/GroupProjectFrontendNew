"use server";

import { signIn } from "@/utils/auth";

export default async function signInAction(formData: FormData) {
  await signIn("credentials", formData);
}
