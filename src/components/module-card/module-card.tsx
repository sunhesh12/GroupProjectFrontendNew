// components/CourseCart.tsx
import React from "react";
import Image from "next/image";
import style from "./module-card.module.css";

interface CourseCardProps {
  id: string;
  imageUrl: string;
  completion: number;
  name: string;
  semester: number;
}

export default function ModuleCard({
  id,
  imageUrl,
  completion,
  name,
  semester,
}: CourseCardProps) {
  return (
    <div key={id} className={style.courseCard}>
      <div className={style.CardImage}>
        <Image
          className={style.courseCardImage}
          src={imageUrl}
          alt="cardImage"
          fill={true}
        />
        <div className={style.whitecorner}>
          <p>{completion}% completed</p>
        </div>
      </div>
      <div className={style.courseName}>
        <h1>{name}</h1>
      </div>
      <div className={style.courseSemester}>
        <p>Semester {semester}</p>
      </div>
    </div>
  );
};