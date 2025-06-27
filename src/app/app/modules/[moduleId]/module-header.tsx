import styles from "./page.module.css";
import IconButton from "@/components/buttons/icon/view";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ModuleHeaderProps {
    moduleName: string;
    teachers: string[];
    moduleImage: string | null;
}

export default function ModuleHeader({
    moduleName,
    teachers,
    moduleImage
}: ModuleHeaderProps) {
    return (
        <header className={styles.header}>
        <nav className={styles.courseNav}>
          <IconButton icon={faArrowLeft} color="white" />
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
        </nav>
        <article
          className={styles.banner}
          style={{
            backgroundImage: `url(${moduleImage ?? "/module/banner.webp"})`,
          }}
        ></article>
      </header>
    )
}