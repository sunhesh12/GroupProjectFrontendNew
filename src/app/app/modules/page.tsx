import style from "./page.module.css";
import SearchBar from "./search-bar";
import { redirect } from "next/navigation";
import { user } from "@/utils/backend";
import Link from "next/link";
import { getSession } from "@/actions/get-session";
import ModuleCard from "@/components/module-card/module-card";

export default async function Modules() {
  const currentUser = await getSession();

  if (!currentUser) {
    // If unauthenticated, redirect to signin
    redirect("/auth/signin");
  }

  // Fetching modules based on user role
  const modules =
    currentUser.role === "student"
      ? await user.modules(currentUser)
      : await user.getTeachingModules(currentUser);

  // Case for no module found
  if (!modules.payload) {
    return;
  }

  // if(!session.payload?.user || !session.payload?.token) {
  //   // Empty user returned
  //   redirect("/auth/signin");
  // }

  return (
    <main className={style.mainWrapper}>
      <header className={style.courseHeader}>
        <h1 className={style.heading}>Modules</h1>
        <div className={style.filterCourse}>
          <SearchBar searchQuery={""} semesters={["1", "2", "3"]} />
        </div>
      </header>
      <div className={style.courseBody}>
        {modules.payload.length > 0 ? (
          modules.payload.map((module) => (
            <div key={module.id} className={style.cardWrapper}>
              <Link
                href={`/app/modules/${module.id}`}
                className={style.cardLink}
              >
                <ModuleCard
                  id={module.id}
                  imageUrl={module.image ?? "/module-cover.webp"}
                  completion={0}
                  name={module.module_name}
                  semester={Number(module.semester)}
                />
              </Link>
            </div>
          ))
        ) : (
          <p>No modules assigned for this course</p>
        )}
      </div>
    </main>
  );
}
