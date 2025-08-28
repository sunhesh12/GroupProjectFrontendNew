import { getSession } from "@/actions/get-session";
import { notFound, redirect } from "next/navigation";
import { modules, user } from "@/utils/backend";
import styles from "./page.module.css";
import { faBook, faVideo } from "@fortawesome/free-solid-svg-icons";
import Panel from "@/components/panel/view";
import Timeline from "@/components/timeline/view";
import TimelineItem from "@/components/timeline/timeline-item/view";
import ModuleHeader from "./module-header";
import ModuleToolbar from "./module-toolbar";
import Announcements from "./announcements";
import TopicToolbar from "./topic-toolbar";
import ArchiveModule from "./archive";
interface ModuleProps {
  params: Promise<{ moduleId: string }>;
}

export default async function Module({ params }: ModuleProps) {
  const currentUser = await getSession();

  // Unauthenticated
  if (!currentUser) {
    redirect("/auth/signin");
  }

  const { moduleId } = await params;

  // No module id provided
  if (!moduleId) {
    notFound();
  }

  const moduleResponse = await modules.get(moduleId);

  // No module found for given id
  if (moduleResponse.status === 404 || !moduleResponse.payload) {
    notFound();
  }

  // Any server error
  if (moduleResponse.status === 500) {
    throw new Error("Internal server error has occured");
  }

  // Unauthorized access to module
  if (moduleResponse.status === 403) {
    redirect("/auth/signin");
  }

  const courseModule = moduleResponse.payload;

  // Handling empty module response
  if (!courseModule) {
    throw new Error("Empty module response payload");
  }

  if (moduleResponse.payload.archived) {
    return <ArchiveModule moduleId={moduleId} role={currentUser.role} />;
  }

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
