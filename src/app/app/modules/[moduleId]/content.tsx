"use client";

// Contains the content of a module including topics and materials

import styles from "./page.module.css";
import { faBook, faVideo } from "@fortawesome/free-solid-svg-icons";
import Panel from "@/components/panel/view";
import Timeline from "@/components/timeline/view";
import TimelineItem from "@/components/timeline/timeline-item/view";
import ModuleHeader from "./module-header";
import ModuleToolbar from "./module-toolbar";
import Announcements from "./announcements";
import TopicToolbar from "./topic-toolbar";
import { FullModule, User } from "@/utils/types/backend";

interface ModuleContentProps {
  courseModule: FullModule;
  currentUser: User;
  moduleId: string;
}

export default function ModuleContent({
  courseModule,
  currentUser,
  moduleId,
}: ModuleContentProps) {
  return (
    <main className={styles.main}>
      <ModuleHeader
        moduleName={courseModule.module_name}
        moduleImage={courseModule.image}
        description={courseModule.description}
        teachers={["Amal"]}
      />
      <div className={styles.content}>
        {currentUser.role === "lecturer" && (
          <ModuleToolbar moduleId={moduleId} />
        )}
        <Announcements />
        <ul id="topics" className={styles.topics}>
          {courseModule.topics.map((topic, index) => (
            <li key={index}>
              <Panel
                header={topic.title}
                icon={topic.type === "lecture" ? faBook : faVideo}
              >
                <p>{topic.description}</p>
                <div id="materials">
                  <h4>Lecture Materials</h4>
                  {currentUser.role === "lecturer" && (
                    <TopicToolbar topicId={topic.id} />
                  )}
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
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
