import React from "react";
import Task from "@/components/Task/Task";
import Image from "next/image";
import style from "./dashboard.module.css";

interface TaskData {
  title: string;
  time: string;
  imageSrc: string;
  link: string;
}

interface SemesterWorkProps {
  tasks: TaskData[];
}

const SemesterWork: React.FC<SemesterWorkProps> = ({ tasks }) => {
  return (
    <div className={style.contiuneSemesterWorkWrapper}>
      <div className={style.contiuneSemesterWorkHedding}>
        <Image
          className={style.cswImage}
          src="/Examination.ico"
          alt="Continue semester work logo"
          width={50}
          height={50}
        />
        <h1>Continue your semester work</h1>
      </div>
      <div className={style.contiuneSemesterWorkBody}>
        <p>
          Never miss a single task assigned in the semester. Check out these activities before they are missed.
        </p>
      </div>
      <div className={style.contiuneSemesterWorkTask}>
        {tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            time={task.time}
            imageSrc={task.imageSrc}
            link={task.link}
          />
        ))}
      </div>
    </div>
  );
};

export default SemesterWork;
