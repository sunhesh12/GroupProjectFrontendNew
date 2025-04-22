import style from "./page.module.css";
import SearchBar from "./search-bar";
import SemesterSelector from "./semester-selector";
import CourseList from "./module-list";
import EnrollmentModal from "./enrollment-modal";
import type { ModuleWithCourses } from "@/utils/types/backend";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { courses } from "@/utils/backend";

export default async function Modules({
  searchParams,
}: {
  modules: ModuleWithCourses[];
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  if (!session) {
    // If un authenticated redirected to signin
    redirect("/auth/signin");
  }

  const user = session.user;
  const modules = (await courses.getModules(user.courseId)).payload;

  // Extract search query and selected semester from URL search params
  const params = (await searchParams) as {
    searchQuery: string;
    selectedSemester: string;
  };
  console.log(params.searchQuery);

  return (
      <main className={style.mainWrapper}>
        <header className={style.courseHeader}>
          <h1 className={style.heading}>Modules</h1>
          {user.courseId ? (
            <p className={style.subHeading}>
              List of all the courses available throughout the degree programme.
            </p>
          ) : (
            <p className={style.subHeading}>
              You might not have assigned to any course.
            </p>
          )}

          <div className={style.filterCourse}>
            <SearchBar
              searchQuery={params.searchQuery}
              semesters={["1", "2", "3"]}
            />
          </div>
        </header>
        {modules ? (
          <CourseList filteredModules={modules} />
        ) : (
          <p>No modules available for this course</p>
        )}
      </main>
  );
}
