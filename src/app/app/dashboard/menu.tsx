import CreateCourseCard from "@/components/create-card/view";
import {
  faGraduationCap,
  faPlus,
  faUser,
  faAward
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

interface MenuProps {
  role: string;
}

interface Link {
  icon: IconDefinition;
  title: string;
  caption: string;
  link: string;
}

export default function Menu({ role }: MenuProps) {
  let header = "Start your journey of learning";
  let links: Link[] = [];
  role = "admin";

  if (role === "admin") {
    header = "Manage the LMS in your way";
    links = [
      {
        icon: faGraduationCap,
        title: "Manage resources",
        caption: "Create or manage new courses for your student",
        link: "/app/admin/manage/students",
      },
      {
        icon: faPlus,
        title: "Manage modules",
        caption: "Create or manage a module for a specific course",
        link: "/app/modules/manage",
      },
      {
        icon: faUser,
        title: "Manage users",
        caption: "Manage all the portal users in the LMS",
        link: "/app/admin/manage/users",
      },
      {
        icon: faAward,
        title: "Manage examinations",
        caption: "Release the semester results for a specific course",
        link: "/app/quizes/create",
      },
    ];
  }

  if (role === "lecturer") {
    header = "Start your journey of teaching";
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
