import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { getSession } from "@/utils/auth"; // your custom cookie reader
import { redirect } from "next/navigation";
import { user } from "@/utils/backend";


// Load the calendar dynamically (client only)
const CalendarApp = dynamic(() => import('../../../components/calendar/calendar'));


export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/auth/signin");

  const userId = session.id;
  const token = session.token; // if your API needs Bearer token

  return (
    <div className={styles["page-calendar-container"]}>
      
      <CalendarApp userId={userId} token={token} />
    </div>
  );
}
