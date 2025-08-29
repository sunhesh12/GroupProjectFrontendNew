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
import { Announcement, FullModule, User } from "@/utils/types/backend";
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

  const [optimisticAnnouncements, setOptimisticAnnouncements] = useState<
    Announcement[]
  >(courseModule.announcements || []);

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
            announcementUpdate={(announcement) =>
              setOptimisticAnnouncements((prev) => [...prev, announcement])
            }
            moduleId={moduleId}
          />
        )}
        <Announcements announcements={optimisticAnnouncements} />
        {/* {assignmentsPayload.map((assignment: any) => (
          <Panel key={assignment.id} header={assignment.title} icon={faBook}>
            <p>{assignment.description}</p>
            <p>
              Due Date: {new Date(assignment.due_date).toLocaleDateString()}
            </p>
          </Panel>
        ))} */}
        <ul id="topics" className={styles.topics}>
          {optimisticTopics.map((topic, index) => (
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
                  {topic.lecture_materials?.length === 0 && (
                    <p>No materials have been added yet.</p>
                  )}
                  {topic.type === "assignment" &&
                    topic.lecture_materials &&
                    topic.lecture_materials?.length > 0 && (
                      <Timeline>
                        {topic.lecture_materials?.map((material, index) => (
                          <TimelineItem
                            key={index}
                            lectureMaterial={material}
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
