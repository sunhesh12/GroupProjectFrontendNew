import { auth } from "@/utils/auth";
import { notFound, redirect } from "next/navigation";
import { modules } from "@/utils/backend";
import styles from "./page.module.css";
import {
  faArrowLeft,
  faBook,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Panel from "@/components/panel/view";
import IconButton from "@/components/buttons/icon/view";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { topics } from "@/utils/ModuleSubtopics";
import Timeline from "@/components/timeline/view";
import TimelineItem from "@/components/timeline/timeline-item/view";

interface ModuleProps {
  params: Promise<{ id: string | undefined }>;
}

export default async function Module({ params }: ModuleProps) {
  const session = await auth();

  // Unauthenticated
  if (!session) {
    redirect("/login");
  }

  const moduleId = (await params).id;
  console.log(moduleId);

  // No module id provided
  if (!moduleId) {
    notFound();
  }

  const module = (await modules.get(moduleId)).payload;

  // Module isn't awailable
  if (!module) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <nav className={styles.courseNav}>
          <IconButton icon={faArrowLeft} color="white" />
          <div className={styles.courseInfo}>
            <h1>{module.module_name}</h1>
            <p>
              {module.teachers.map((teacher, index) => (
                <span key={index}>
                  {teacher.Full_name}
                  {index < module.teachers.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </nav>
        <article
          className={styles.banner}
          style={{
            backgroundImage: `url(${module.image ?? "/module/banner.webp"})`,
          }}
        ></article>
      </header>
      <div className={styles.content}>
        <Panel header="Announcements" icon={faBell}>
          <p>Panel Content</p>
        </Panel>
        <nav>Tabs</nav>
        <ul id="topics" className={styles.topics}>
          {module.topics.map((topic, index) => (
            <Panel
              header={topic.title}
              key={index}
              icon={topic.type === "lecture" ? faBook : faVideo}
            > 
              <p>{topic.description}</p>
              <div id="materials">
                <h4>Lecture Materials</h4>
                <Timeline>
                  {topic.lecture_materials.map((material, index) => (
                    <TimelineItem
                      key={index}
                      link={material.material_url}
                      title={material.material_title}
                    />
                  ))}
                </Timeline>
              </div>
            </Panel>
          ))}
        </ul>
      </div>
    </main>
  );
}
