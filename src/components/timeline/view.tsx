"use client";
import styles from "./style.module.css";

interface TimelineProps {
  children?: React.ReactNode;
}

export default function Timeline({ children }: TimelineProps) {
  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        {/* Timeline line */}
        <div className={styles.timelineLine} />

        {/* Timeline items */}
        <ul className={styles.timelineItems}>
          {/* Item 1 */}
          {children}
        </ul>
      </div>
    </div>
  );
}
