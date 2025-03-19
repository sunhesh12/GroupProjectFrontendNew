import { user } from "@/utils/backend";
import styles from "./page.module.css";
import Manage from "./manage";

export default async function ManageLecturers() {
  const res = await user.getLecturers();

  if (!res?.payload) {
    return (
      <div id="lecturersConsole" className={styles.page}>
        <header>
          <h3>Lecturer details</h3>
        </header>
        Didn't recieve the payload
      </div>
    );
  }

  const users = res.payload;

  return (
    <div id="lecturersConsole" className={styles.page}>
      <Manage users={users} />
    </div>
  );
}
