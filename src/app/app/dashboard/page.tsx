import {auth} from "@/utils/auth";
import {redirect} from "next/navigation";
import {user} from "@/utils/backend";
import Greeting from "./greeting";
import style from "./page.module.css";
import Role from "./role";
import Menu from "./menu";

export default async function DashboardPage() {
  // This session will be fowarded to rest of the components
  const session = await auth();

  if(!session || !session.user) {
    redirect("/auth/signin");
  }

  // Current user payload
  const currentUser = await user.get(session?.user.id!);

  if(!currentUser?.payload) {
    throw new Error("No user payload recieved from API");
  }

  console.log(currentUser);
  return (
    <main className={style.page}>
      <header className={style.dashboardHeader}>
        <Greeting name={currentUser.payload.full_name} />
        <Role role={currentUser.payload.role} />
      </header>
      <Menu role={currentUser.payload.role} />
      <article>
        <header>Your activities</header>
      </article>
      <article>
        <header>Announcements</header>
      </article>
      <article>
        <header>Courses</header>
      </article>
    </main>
  );
}
