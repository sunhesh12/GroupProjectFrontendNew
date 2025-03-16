import { Table, TableRow } from "@/components/table/view";
import styles from "./page.module.css";
import { auth } from "@/utils/auth";
import { user } from "@/utils/backend";
import { modules } from "@/utils/backend";
import { notFound, redirect } from "next/navigation";

export default async function ModuleManage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const currentUser = await user.get(session.user.id!);

  if (!currentUser?.payload)
    throw new Error("User payload haven't fetched from server");

  if (currentUser?.payload?.Role !== "admin") {
    notFound();
  }

  const allModules = await modules.getAll();

  if (!allModules?.payload) {
    throw new Error("Course payload didn't recieve from the backend");
  }

  return (
    <div className={styles.main}>
      <header>
        <h1>Manage all the modules</h1>
        <p>Filters</p>
        <form></form>
      </header> 
      <Table columns={["Module name", "Course", "Credit value"]}>
        {allModules?.payload?.map(({module_name, }, index) => (
          <TableRow values={["CSO", "CS", "2"]} key={index} />
        ))}
      </Table>
    </div>
  );
}
