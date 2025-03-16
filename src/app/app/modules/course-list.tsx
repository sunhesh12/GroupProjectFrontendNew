import React from "react";
import style from "./page.module.css";
import Link from "next/link";
import CourseCart from "@/components/course-card/course-card";

interface CourseListProps {
  filteredCourses: any[];
  handleCourseClick: (course: any) => void;
}

const CourseList: React.FC<CourseListProps> = ({
  filteredCourses,
  handleCourseClick,
}) => {
  return (
    <div className={style.courseBody}>
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <div key={course.id} className={style.cartWrapper}>
            {course.isEnrolled ? (
              <Link
                href={`${course.link}/${course.name}`}
                className={style.cartLink}
              >
                <CourseCart
                  id={course.id}
                  imageUrl={course.imageUrl}
                  completion={course.completion}
                  name={course.name}
                  semester={course.semester}
                />
              </Link>
            ) : (
              <div
                className={style.cartLink}
                onClick={() => handleCourseClick(course)}
              >
                <CourseCart
                  id={course.id}
                  imageUrl={course.imageUrl}
                  completion={course.completion}
                  name={course.name}
                  semester={course.semester}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default CourseList;
