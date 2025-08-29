import CreateCourseCard from "@/components/create-card/view";
import {
  faGraduationCap,
  faPlus,
  faUser,
  faAward,
  faBook,
  faChalkboardTeacher,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

interface MenuProps {
  role: "student" | "lecturer" | "admin"; // restrict allowed roles
}

interface Link {
  icon: IconDefinition;
  title: string;
  caption: string;
  link: string;
}

export default function Menu({ role }: MenuProps) {
  let header = "";
  let links: Link[] = [];

  // --- Admin ---
  if (role === "admin") {
    header = "Manage the LMS in your way";
    links = [
      {
        icon: faGraduationCap,
        title: "Manage resources",
        caption: "Create or manage new courses for your student",
        link: "#",
      },
      {
        icon: faPlus,
        title: "Manage modules",
        caption: "Create or manage a module for a specific course",
        link: "#",
      },
      {
        icon: faUser,
        title: "Manage users",
        caption: "Manage all the portal users in the LMS",
        link: "#",
      },
      {
        icon: faAward,
        title: "Manage examinations",
        caption: "Release the semester results for a specific course",
        link: "#",
      },
    ];
  }

  // --- Lecturer ---
  if (role === "lecturer") {
    header = "Start your journey of teaching";
    links = [
      {
        icon: faChalkboardTeacher,
        title: "My Courses",
        caption: "View and manage the courses you teach",
        link: "#",
      },
      {
        icon: faClipboardList,
        title: "Assignments",
        caption: "Create and evaluate student assignments",
        link: "#",
      },
      {
        icon: faBook,
        title: "Course Resources",
        caption: "Upload and organize learning materials",
        link: "#",
      },
    ];
  }

  // --- Student ---
  if (role === "student") {
    header = "Start your journey of learning";
    links = [
      {
        icon: faGraduationCap,
        title: "My Courses",
        caption: "Browse and access your enrolled courses",
        link: "#",
      },
      {
        icon: faBook,
        title: "Study Materials",
        caption: "Read and download course content",
        link: "#",
      },
      {
        icon: faAward,
        title: "Examinations",
        caption: "Check and attempt your exams",
        link: "#",
      },
    ];
  }

  return (
    <article id="menu">
      <header>{header}</header>
      <ul className={styles.menuList}>
        {links.map(({ icon, title, caption, link }, index) => (
          <li key={index}>
            <CreateCourseCard
              icon={icon}
              title={title}
              caption={caption}
              href={link}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
