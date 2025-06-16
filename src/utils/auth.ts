import { cookies } from "next/headers";
import { user } from "./backend";
import type { Session } from "./types/backend";

export async function getSession(): Promise<Session | null> {
  // Checking if the user is authenticated (with cookie)
  const cookieStore = await cookies();

  if (cookieStore.has("session")) {
    const sessionCookie = cookieStore.get("session")?.value;
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie) as Session;

        // Validating the session with the user backend
        const userObj = await user.get(session);

        if (userObj) {
          return session;
        }
      } catch (error) {
        console.error("Error parsing session cookie:", error);
      }
    }
  }

  return null; // No session found
}
