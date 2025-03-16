import React from "react";
import style from "./dashboard.module.css";
import Image from "next/image";
import Link from "next/link";

type AcademicPerformanceProps = {
    GPA: string;
  improveGpaLink: string;
  examResultLink:string;
};

export default function academicPerfomance({
    GPA,
    improveGpaLink,
    examResultLink,
}: AcademicPerformanceProps) {
  return (
    <>
      <div className={style.academicPerfomanceWrapper}>
        <div className={style.academicPerfomanceHeading}>
          <h1>Your Academic Performance</h1>
        </div>
        <div className={style.academicPerfomanceConent}>
          <div className={style.apIcon}>
            <Image
              src={"/Examination.ico"}
              alt="Examination Icon"
              width={75}
              height={75}
            />
          </div>
          <div className={style.apText}>
            <h1>Last semester was great</h1>
            <p>
              You scored a GPA of{" "}
              <span>
                <b>{GPA}</b>
              </span>
            </p>
          </div>
          <div className={style.aplinks}>
            <Link href={improveGpaLink}><p><u>Improve my GPA</u></p></Link>
          </div>
          <div className={style.aplinks}>
          <Link href={examResultLink}><p><u>See examination results</u></p></Link>
          </div>
        </div>
      </div>
    </>
  );
}
