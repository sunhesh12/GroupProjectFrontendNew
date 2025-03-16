import { user } from "@/utils/backend";
import styles from "./page.module.css";
import Manage from "./manage";

export default async function ManageStudents() {
  const res = await user.getAll();

  if (!res?.payload) {
    return (
      <div id="studentsConsole" className={styles.page}>
        <header>
          <h3>Student details</h3>
        </header>
        No users found
      </div>
    );
  }

  const users = res.payload;

  return (
    <div id="studentsConsole" className={styles.page}>
      <Manage users={users} />
    </div>
  );
}
