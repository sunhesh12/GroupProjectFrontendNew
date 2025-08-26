import { cookies } from "next/headers";
import { user } from "./backend";
import type { Session, User } from "./types/backend";

// A utility to get the current user session from the server (used in client components)
export async function getClientSession() {
  try {
    const response = await fetch("/api/session", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }

    const data = await response.json();
    if (data.status === "success") {
      return data.payload;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}