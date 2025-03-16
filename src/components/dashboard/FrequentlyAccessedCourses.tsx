// components/FrequentlyAccessedCourses.tsx
import React from "react";
import style from "./dashboard.module.css";
import { courses } from "@/utils/studentDasboarddb"; // Import the courses data
import Link from "next/link";
import CourseCart from "@/components/course-card/course-card";  // Import the CourseCart component

const FrequentlyAccessedCourses: React.FC = () => {
  return (
    <div className={style.facourses}>
      <div className={style.facoursesHeading}>
        <h1>Frequently Accessed Courses</h1>
      </div>
      <div className={style.contiuneSemesterWorkTask}>
        {courses.map((course) => (
          <Link key={course.id} href={course.link} className={style.cartLink}>
            <CourseCart
              id={course.id}
              imageUrl={course.imageUrl}
              completion={course.completion}
              name={course.name}
              semester={course.semester}
              link={course.link}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAccessedCourses;
