import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';
import styles from "./page.module.css";

// Dynamically load the client component
const ExaminationResultsClient = dynamic(() => import('@/components/exam/exam'));

export default async function HomePage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/auth/signin");
  }
  
  // Pass userId to the client component
  return (
    <div className={styles["page-container"]}>
      <ExaminationResultsClient userId={session.id} />
    </div>
  );
}