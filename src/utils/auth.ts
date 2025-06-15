import { cookies } from "next/headers";
import { user } from "./backend";

export async function getSession() {
  // Checking if the user is authenticated (with cookie)
  const cookieStore = await cookies();

  if (cookieStore.has("session")) {
    const sessionCookie = cookieStore.get("session")?.value;
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie);

        // Validating the session with the user backend
        const userObj = await user.auth.get(session);

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
