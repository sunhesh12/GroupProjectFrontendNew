"use server";

import { cookies } from "next/headers";
import { user } from "@/utils/backend";
import { redirect } from "next/navigation";

export default async function signOutAction() {
  const cookieStore = await cookies();

  if (cookieStore.has("session")) {
    const sessionCookie = cookieStore.get("session")?.value;
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie);
        // Invalidating the session at the backend (just calling the signout endpoint)
        await user.auth.signout();
      } catch (error) {
        console.error("Error while signing out", error);
      }
    }

    // Deleting the session cookie
    cookieStore.delete("session");
  }

  redirect("/auth/signin");
}