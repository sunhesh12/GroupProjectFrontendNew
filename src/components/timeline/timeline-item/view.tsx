import { Suspense } from "react";
import styles from "./style.module.css";
import Preview from "@/components/preview/view";
import Spinner from "@/components/spinner/view";

interface TimelineProps {
  title: string;
  link: string;
}

export default async function TimelineItem({ title, link }: TimelineProps) {
  return (
    <li className={styles.timelineItem}>
      {/* Timeline dot */}
      <div className={styles.timelineDot} />

      <br />
      <Suspense fallback={
        <div className={styles.loading}>
          <Spinner theme="dark" width={20} height={20} />
          Loading resource
        </div>
      }>
        <Preview link={link} title={title} />
      </Suspense>
    </li>
  );
}
