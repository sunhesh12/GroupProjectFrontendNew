"use server";
import { user } from "@/utils/backend";
import type { User, Session } from "@/utils/types/backend";
import { cookies } from "next/headers";

export async function getSession(): Promise<User | null> {
  // Checking if the user is authenticated (with cookie)
  const cookieStore = await cookies();

  if (cookieStore.has("session")) {
    const sessionCookie = cookieStore.get("session")?.value;
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie) as Session;

        // Validating the session with the user backend
        const userObj = await user.get(session);

        if (userObj.status === 200 && userObj.payload) {
          return {...userObj.payload, token: session.token};
        }
      } catch (error) {
        console.error("Error while authenticating", error);
      }
    }
  }

  return null; // No session found
}