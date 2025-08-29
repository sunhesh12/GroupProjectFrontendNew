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
import { useOptimistic } from "react";
import { Topic } from "@/utils/types/backend";
import { useState } from "react";

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
  // Hook to make optimistic updates when creating a new topic
  const [optimisticTopics, setOptimisticTopics] = useState<Topic[]>(
    courseModule.topics
  );

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
          <ModuleToolbar
            topicUpdate={(topic) =>
              setOptimisticTopics((prev) => [...prev, topic])
            }
            moduleId={moduleId}
          />
        )}
        <Announcements />
        <ul id="topics" className={styles.topics}>
          {optimisticTopics.map((topic) => (
            <li key={topic.id}>
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
                  {topic.lecture_materials?.length === 0 && (
                    <p>No materials have been added yet.</p>
                  )}
                  {topic.lecture_materials &&
                    topic.lecture_materials?.length > 0 && (
                      <Timeline>
                        {topic.lecture_materials?.map((material, index) => (
                          <TimelineItem
                            key={index}
                            link={material.material_url}
                            title={material.material_title}
                          />
                        ))}
                      </Timeline>
                    )}
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
