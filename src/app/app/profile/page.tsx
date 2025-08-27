import { redirect } from "next/navigation";
import { getSession } from "@/utils/auth"; 
import SettingsClient from "../../../components/profile/profile";
import { url } from "@/utils/backend";
import { div, h1 } from "motion/react-client";
import { style } from "motion/react-m";
import styles from "./page.module.css";

async function getUser(token: string, userId: number) {
  try {
    const res = await fetch(`${url}/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default async function SettingsPage() {
  // ✅ read session from cookies via your util
  const session = await getSession();

  if (!session || !session.id || !session.token) {
    redirect("/login");
  }

  // fetch user details with token + id
  const userData = await getUser(session.token, session.id);

  if (!userData) {
    redirect("/login");
  }

  return (
    
          <>
            <div className={styles.topic}>
              <h1>Settings</h1>
              <h2>Edit Your Details</h2>
            </div>
            
            <div className="p-6">
            <SettingsClient
              user={userData.payload || userData.user || userData} 
              token={session.token}
              userId={session.id}
            />
          </div>
          </>

          
       
  );
}
