import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import Content from "./content";
import { modules } from "@/utils/backend";

export default async function Page() {
  const session = await auth();

  if(!session) redirect("/auth/signin");

  const user = session.user;

  if(!user) {
    throw new Error("User couldn't found");
  }
 
  const allModules = (await modules.getAll()).payload;

  if(!allModules) {
    return (
      <p>No any enrolled courses. Contact admin</p>
    )
  }

  return (
    <div>
      <Content modules={allModules} /> 
    </div>
  );
}
