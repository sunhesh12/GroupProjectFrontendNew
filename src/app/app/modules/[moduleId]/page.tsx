import { getSession } from "@/utils/auth";
import { notFound, redirect } from "next/navigation";
import { modules, user } from "@/utils/backend";
import styles from "./page.module.css";
import { faBook, faVideo } from "@fortawesome/free-solid-svg-icons";
import Panel from "@/components/panel/view";
import Timeline from "@/components/timeline/view";
import TimelineItem from "@/components/timeline/timeline-item/view";
import TopicToolbar from "@/components/module-toolbar/view";
import ModuleHeader from "./module-header";
import Announcements from "./announcements";

interface ModuleProps {
  params: Promise<{ moduleId: string }>;
}

export default async function Module({ params }: ModuleProps) {
  const session = await getSession();

  // Unauthenticated
  if (!session) {
    redirect("/auth/signin");
  }

  const { moduleId } = await params;

  // No module id provided
  if (!moduleId) {
    notFound();
  }

  const currentUserResponse = await user.get(session);

  // No user found for given session (probably a cookie indjection)
  if(currentUserResponse.status === 404 || !currentUserResponse.payload) {
    redirect("/auth/signin");
  }

  // Error while fetching user
  if(currentUserResponse.status === 500) {
    throw new Error("Internal server error has occurred while fetching user data");
  }

  const moduleResponse = await modules.get(moduleId);

  // No module found for given id
  if (moduleResponse.status === 404) {
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

  return (
    <main className={styles.main}>
      <ModuleHeader
        moduleName={courseModule.module_name}
        moduleImage={courseModule.image}
        teachers={["Amal"]}
      />
      <div className={styles.content}>
        {currentUserResponse.payload.role === "lecturer" && <TopicToolbar />}
        <Announcements />
        <nav>Tabs</nav>
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
