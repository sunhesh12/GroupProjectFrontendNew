import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Fragment } from "react";

interface CreateCourseCardProps {
  icon: IconDefinition;
  title: string;
  caption: string;
  href?: string;
  onClick?: () => void;
}

export default function CreateCourseCard({
  icon,
  title,
  caption,
  href,
  onClick,
}: CreateCourseCardProps) {
  const block = (
    <Fragment>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon width={24} height={24} icon={icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{caption}</p>
      </div>
    </Fragment>
  );

  if (href) {
    return <Link href={href} className={styles.createCourseCard}>
      {block}
    </Link>;
  }

  return (
    <button className={styles.createCourseCard} onClick={onClick}>
      {block}
    </button>
  );
}
