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
import Link from "next/link";
import { PortalUser } from "@/utils/types/backend";

interface ModuleListProps {
  filteredModules: Module[];
  handleCourseClick?: (course: any) => void;
}

export default async function DashboardPage({
  filteredModules,
  handleCourseClick,
}: ModuleListProps) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const currentUser = await user.get(session?.user.id!);

  if (!currentUser?.payload) {
    throw new Error("No user payload received from API");
  }

  console.log(currentUser);

  return (
    <main className={style.page}>
      <header className={style.dashboardHeader}>
        <Greeting name={currentUser.payload.full_name} />
        {/* <Role role={currentUser.payload.role} /> */}
      </header>
      <article>
        {/* <h1>Academic Performance</h1> */}
        <div className={style.activityListAD}>
          <div className={style.activityContentTextAD}>
            <div><h1>Assignment Deadline soon</h1></div>
            <div><p>Complete these urgent assignments before their deadline ends</p></div>
          </div>
          <div className={style.activityContentLinkAD}><Link href="#">Go to Activity</Link></div>
        </div>
      </article>
      <br></br>
      <Menu role={currentUser.payload.Role} />
      <article>
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
              Never miss a single task assigned in the semester. Check out these
              activities before they are getting missed
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

            {/* Placeholders */}
            <div className={style.activityContent}></div>
            <div className={style.activityContent}></div>
          </div>
        </div>
      </article>

      <article>
        <h1>Frequently Accessed Courses</h1>
        <div className={style.activityListFAC}>
          {filteredModules && filteredModules.length > 0 ? (
            filteredModules?.map((module) => (
              <div key={module.id} className={style.moduleCardWrapper}>
                <ModuleCard
                  id={module.id}
                  imageUrl={module.image ?? "/module-cover.webp"}
                  completion={0}
                  name={module.module_name ?? "Not Available"}
                  semester={Number(module.semester)}
                />
              </div>
            ))
          ) : (
            <div className={style.moduleCardWrapper}>
              <ModuleCard
                id="default"
                imageUrl="/module-cover.webp"
                completion={0}
                name="No Modules Found"
                semester={0}
              />
            </div>
          )}
        </div>
      </article>

      <article>
        <h1>Academic Performance</h1>
        <div className={style.activityListAP}>
          <div className={style.activityContentIconAP}>
                            <Image
                  src="/icons/checklist.png"
                  alt="Activity Image"
                  width={50}
                  height={50}
                />
          </div>
          <div className={style.activityContentTextAP}>
            <div><h1>Last Semester was Great</h1></div>
            <div><p>You scored a GPA of <span><b>3.5</b></span></p></div>
          </div>
          <div className={style.activityContentLinkAP}><Link href="#">Improve my GPA</Link></div>
          <div className={style.activityContentLinkAP}><Link href="#">See examination results</Link></div>
        </div>
      </article>
    </main>
  );
}
