// components/CourseCart.tsx
import React from "react";
import Image from "next/image";
import style from "./course-card.module.css";

interface CourseCardProps {
  id: number;
  imageUrl: string;
  completion: number;
  name: string;
  semester: string;
}

export default function CourseCard({
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
          width={100}
          height={100}
        />
        <div className={style.whitecorner}>
          <p>{completion}% completed</p>
        </div>
      </div>
      <div className={style.courseName}>
        <h1>{name}</h1>
      </div>
      <div className={style.courseSemester}>
        <p>{semester}</p>
      </div>
    </div>
  );
};