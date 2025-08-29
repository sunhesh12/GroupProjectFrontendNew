import styles from "./page.module.css";
import IconButton from "@/components/buttons/icon/view";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BackButton from "./back-button";

interface ModuleHeaderProps {
  moduleName: string;
  teachers: string[];
  description?: string;
  moduleImage: string | null;
}

export default function ModuleHeader({
  moduleName,
  teachers,
  moduleImage,
  description,
}: ModuleHeaderProps) {
  return (
    <header className={styles.header}>
      {/* <nav className={styles.courseNav}>
        <BackButton />
        <div className={styles.courseInfo}>
          <h1>{moduleName}</h1>
          <p>
            {teachers.map((teacher, index) => (
              <span key={index}>
                {teacher}
                {index < teachers.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </nav> */}
      <article
        className={styles.banner}
        style={{
          backgroundImage: `url(${moduleImage ?? "/module/banner.webp"})`,
        }}
      >
        <div className={styles.courseInfoContainer}>
          <div className={styles.courseInfo}>
            <h1>{moduleName}</h1>
            <span className={styles.teachers}>Dr. {teachers.concat("")}</span>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </article>
    </header>
  );
}
