// 'use client'
import { redirect } from "next/navigation";
import { user } from "@/utils/backend";
import Greeting from "./greeting";
import style from "./page.module.css";
import Menu from "./menu";
import Image from "next/image";
import ModuleCard from "@/components/module-card/module-card";
import { Module } from "@/utils/types/backend";
import Link from "next/link";
import { getSession } from "@/actions/get-session";
import { fetchQuizQuestions } from "@/utils/quizbackend";

interface ModuleListProps {
  filteredModules: Module[];
  handleCourseClick?: (course: any) => void;
}

export default async function DashboardPage({
  filteredModules,
  handleCourseClick,
}: ModuleListProps) {
  const currentUser = await getSession();

  if (!currentUser) {
    redirect("/auth/signin");
  }

  console.log(currentUser);

  let quizAnswerList = [];
  try {
    quizAnswerList = await fetchQuizQuestions();
    console.log("Fetched quiz data:", quizAnswerList);
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }

  const today = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 7);

  // Filter only items with deadlines within a week
  const upcomingQuizzes = quizAnswerList.filter((item) => {
    const deadlineDate = new Date(item.deadline);
    return deadlineDate >= today && deadlineDate <= oneWeekFromNow;
  });

  // const deadlineDate = new Date(upcomingQuizzes.deadline);
  // const formattedDeadline = deadlineDate.toLocaleDateString("en-US", {
  //   weekday: "short",   // e.g., Mon
  //   year: "numeric",    // e.g., 2025
  //   month: "short",     // e.g., Aug
  //   day: "numeric"      // e.g., 29
  // });

  return (
    <main className={style.page}>
      <header className={style.dashboardHeader}>
        <Greeting name={currentUser.full_name} />
        {/* <Role role={currentUser.payload.role} /> */}
      </header>

      <div>
        {/* <h1>Quizzes with Deadlines This Week</h1> */}
        {/* <ul> */}
        {upcomingQuizzes.map((item, idx) => (
          <div>
            {/* <li key={idx}>{item.deadline}</li> */}
            <article>
              {/* <h1>Academic Performance</h1> */}
              <div className={style.activityListAD}>
                <div className={style.activityContentTextAD}>
                  <div>
                    <h1>Assignment Deadline soon</h1>
                  </div>
                  <div>
                    <p>
                      {item.description} is due on {item.deadline.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <div className={style.activityContentLinkAD}>
                  <Link href="/app/modules/1/quiz/1">Go to Activity</Link>
                </div>
              </div>
            </article>
          </div>
        ))}
        {/* </ul> */}
        {upcomingQuizzes.length === 0 && (
          <p>No upcoming deadlines this week.</p>
        )}
      </div>

      <br></br>
      <Menu role={currentUser.role} />
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
            {quizAnswerList.map((item, idx) => (
              // <li key={idx}>{item.description}</li>

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
                  <h3>{item.type}</h3>
                  <p>{item.deadline.slice(0, 10)}</p>
                </div>

                <div className={style.activityContentLink}>
                  <Link
                    href="/app/modules/1/quiz/{item.id}"
                    className={style.activityContentLinkItem}
                  >
                    <Image
                      src="/icons/link.svg"
                      alt="Link Icon"
                      width={50}
                      height={50}
                    />
                  </Link>
                </div>
              </div>
            ))}

            {/* </div> */}
          </div>
        </div>
      </article>

      <article>
        <h1>Frequently Accessed Courses</h1>
        <div className={style.activityListFAC}>
          {filteredModules && filteredModules.length > 0 ? (
            // Take only last 5 modules
            filteredModules.slice(-5).map((module) => (
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
            <div>
              <h1>Last Semester was Great</h1>
            </div>
            <div>
              <p>
                You scored a GPA of{" "}
                <span>
                  <b>3.5</b>
                </span>
              </p>
            </div>
          </div>
          <div className={style.activityContentLinkAP}>
            <Link href="#">Improve my GPA</Link>
          </div>
          <div className={style.activityContentLinkAP}>
            <Link href="#">See examination results</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
