'use client'
import React from "react";
import style from "./couseId.module.css";
import Link from "next/link";


interface AssignmentQuizContentProps {
  url:string,
  subtopic: {
    id: string;
    title: string;
    description?: string;
    type: string;
  };
}

const AssignmentQuizContent: React.FC<AssignmentQuizContentProps> = ({ subtopic,url}) => {

  return (
    <div className={style.subtopicItem}>
      <div className={style.subtopicLine}></div>
      <div className={style.subtopicContent}>
        <h4>{subtopic.title}</h4>
        <p>{subtopic.description}</p>
        <Link href={`${url}`}>
          <button className={style.StartButton}>Attempt {subtopic.type}</button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentQuizContent;
