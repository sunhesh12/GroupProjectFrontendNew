"use client";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

const CalendarApp = dynamic(
  () => import("../../../components/calendar/calendar")
);

// import CalendarApp from '@/components/calendar/calendar';

export default function HomePage() {
  return (
    <>
      <div className={styles.calenderContainer}>
        <div className={styles["page-calendar-container"]}>
          <h1 className={styles.one}>Calendar</h1>
          <CalendarApp />
        </div>
      </div>
    </>
  );
}
