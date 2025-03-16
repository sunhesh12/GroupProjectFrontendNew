import React from "react";
import Image from "next/image";
import style from "./Task.module.css";
import Link from "next/link";

type TaskProps = {
  title: string;
  time: string;
  imageSrc: string;
  link: string;
};

const Task: React.FC<TaskProps> = ({ title, time, imageSrc, link }) => {
  return (
    <div className={style.task}>
      <div className={style.taskImage}>
        <Image src={imageSrc} alt={title} width={50} height={50} />
      </div>
      <div className={style.taskBody}>
        <div className={style.Taskheading}>
          <h1>{title}</h1>
        </div>
        <div className={style.Taskbody}>
          <p>{time}</p>
        </div>
      </div>
      <Link href={link} className={style.linkLink}>
        <div className={style.link}>
          <Image src={"/link.gif"} alt={title} width={100} height={100} />
        </div>
      </Link>
    </div>
  );
};

export default Task;
