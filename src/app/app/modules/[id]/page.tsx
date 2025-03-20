import { auth } from "@/utils/auth";
import { notFound, redirect } from "next/navigation";
import Content from "./content";
import { modules } from "@/utils/backend";

interface ModuleProps {
  params: Promise<{ id: string | undefined }>;
}

export default async function Module({ params }: ModuleProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const moduleId = (await params).id;
  console.log(moduleId);

  if (!moduleId) {
    notFound();
  }

  const module = (await modules.get(moduleId)).payload;

  if (!module) {
    notFound();
  }

  return (
    <main>
      <Content module={module} />
    </main>
  );
}
