import style from "./page.module.css";
import SearchBar from "./search-bar";
import { redirect } from "next/navigation";
import { user } from "@/utils/backend";
import Link from "next/link";
import { getSession } from "@/utils/auth";
import ModuleCard from "@/components/module-card/module-card";

export default async function Modules() {
  const session = await getSession();
  console.log(session);

  if (!session) {
    // If unauthenticated, redirect to signin
    redirect("/auth/signin");
  }

  const userResponse = await user.get(session);

  if (userResponse.status === 404 || !userResponse.payload) {
    redirect("/app/auth/signin");
  }

  if (userResponse.status === 500) {
    throw new Error("Internal server error while fetching the user");
  }

  const modules =
    userResponse.payload.role === "student"
      ? await user.modules(session)
      : await user.getTeachingModules(session);

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
