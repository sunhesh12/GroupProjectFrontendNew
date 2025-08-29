import { getSession } from "@/actions/get-session";
import { notFound, redirect } from "next/navigation";
import { assignments, modules } from "@/utils/backend";
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
  //const assignmentResponse = await assignments.getByModule(moduleId);

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
  //const assignmentsPayload = assignmentResponse.payload;

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
