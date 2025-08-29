"use client";
import styles from "./style.module.css";
import Preview from "@/components/preview/view";
import Spinner from "@/components/spinner/view";
import { LectureMaterial } from "@/utils/types/backend";

interface TimelineProps {
  lectureMaterial: LectureMaterial;
}

export default function TimelineItem({ lectureMaterial }: TimelineProps) {
  return (
    <li className={styles.timelineItem}>
      {/* Timeline dot */}
      <div className={styles.timelineDot} />

      <br />
      <Preview material={lectureMaterial} />
      {/* <Suspense fallback={
        <div className={styles.loading}>
          <Spinner theme="dark" width={20} height={20} />
          Loading resource
        </div>
      }>
        <Preview link={link} title={title} />
      </Suspense> */}
    </li>
  );
}
