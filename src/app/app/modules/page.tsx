import style from "./page.module.css";
import SearchBar from "./search-bar";
import SemesterSelector from "./semester-selector";
import CourseList from "./module-list";
import EnrollmentModal from "./enrollment-modal";
import type { ModuleWithCourses } from "@/utils/types/backend";
import { redirect } from "next/navigation";
import { courses } from "@/utils/backend";
import { user } from "@/utils/backend";

export default async function Modules({
  searchParams,
}: {
  modules: ModuleWithCourses[];
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  // if (!session?.user) {
  //   // If un authenticated redirected to signin
  //   redirect("/auth/signin");
  // }

  // if (!session) {
  //   // If un authenticated redirected to signin
  //   redirect("/auth/signin");
  // }

  // if (!session.user.id) {
  //   throw new Error(
  //     "Malformed session !, User ID is not available in the session"
  //   );
  // }

  //const currentUser = await user.get("11");

  // const modules =
  //   currentUser.payload.Role === "lecturer"
  //     ? (await user.getTeachingModules(currentUser.payload.id)).payload
  //     : (await courses.getModules(currentUser.payload.id)).payload;

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
        {/* {user.courseId ? (
          <p className={style.subHeading}>
            List of all the courses available throughout the degree programme.
          </p>
        ) : (
          <p className={style.subHeading}>
            You might not have assigned to any course.
          </p>
        )} */}

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
