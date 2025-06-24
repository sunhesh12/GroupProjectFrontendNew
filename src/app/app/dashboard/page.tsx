import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { user } from "@/utils/backend";
import Greeting from "./greeting";
import style from "./page.module.css";
import Role from "./role";
import Menu from "./menu";
import Image from "next/image";
import ModuleCard from "@/components/module-card/module-card";
import { Module } from "@/utils/types/backend";

interface ModuleListProps {
  filteredModules: Module[];
  handleCourseClick?: (course: any) => void;
}

export default async function DashboardPage({
  filteredModules,
  handleCourseClick,
}: ModuleListProps) {
  // This session will be fowarded to rest of the components
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  // Current user payload
  const currentUser = await user.get(session?.user.id!);

  if (!currentUser?.payload) {
    throw new Error("No user payload recieved from API");
  }

  console.log(currentUser);
  return (
    <>
      <main className={style.page}>
        <header className={style.dashboardHeader}>
          <Greeting name={currentUser.payload.full_name} />
          <Role role={currentUser.payload.role} />
        </header>
        <Menu role={currentUser.payload.role} />
        <article>
          {/* <header>Your activities</header> */}
          <div className={style.activityList}>
            <div className={style.activityHeader}>
              <div className={style.activityHeaderIcon}>
                <Image
                  src="/icons/checklist.png"
                  alt="Activity Image"
                  width={24}
                  height={24}
                />
              </div>
              <div className={style.activityHeaderText}>
                <h1>
                  <b>Continue Your Semester Work</b>
                </h1>
              </div>
            </div>
            <div className={style.activityContentHeading}>
              <p>
                Never miss a single task assigned in the semester. Check out
                these activities before they are getting missed
              </p>
            </div>
            <div className={style.activityContentContainer}>
              <div className={style.activityContent}>
                <div className={style.activityContentIcon}>
                  <Image
                    src="/icons/checklist.png"
                    alt="Activity Image"
                    width={50}
                    height={50}
                  />
                </div>
                <div className={style.activityContentText}>
                  <h3>Task 01</h3>
                  <p>09.30 A.M.</p>
                </div>
                <div className={style.activityContentLink}>
                  <Image
                    src="/icons/link.svg"
                    alt="Link Icon"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className={style.activityContent}></div>
              <div className={style.activityContent}></div>
            </div>
          </div>
        </article>
        <article>
          <header>Frequently Accessed Courses</header>
          <div className={style.activityListFAC}>
            {filteredModules?.map((module) => (
            <ModuleCard
              key={module.id}
              id={module.id}
              imageUrl={module.image ?? "/module-cover.webp"}
              completion={0}
              name={module.module_name ?? ""}
              semester={Number(module.semester)}
            />
             ))} 
             <div className={style.moduleCardWrapper}>
            <ModuleCard
              key={module.id}
              id={module.id}
              imageUrl={module.image ?? "/module-cover.webp"}
              completion={0}
              name={module.module_name ?? ""}
              semester={Number(module.semester)}
            />
            </div>
            <div className={style.moduleCardWrapper}>
            <ModuleCard
              key={module.id}
              id={module.id}
              imageUrl={module.image ?? "/module-cover.webp"}
              completion={0}
              name={module.module_name ?? ""}
              semester={Number(module.semester)}
            />
            </div>
          </div>
        </article>
        <article>
          <header>Courses</header>
        </article>
      </main>
    </>
  );
}
