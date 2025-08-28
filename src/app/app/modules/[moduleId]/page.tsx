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
import ModuleContent from "./content";
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
    <ModuleContent
      currentUser={currentUser}
      moduleId={moduleId}
      courseModule={courseModule}
    />
  );
}
