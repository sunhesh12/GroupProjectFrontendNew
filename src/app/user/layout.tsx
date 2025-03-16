import React from "react";
import style from "./student.module.css";
import SideNavBar from "../../components/sideNavBar/sideNavBar";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={style.Mainwrapper}>
      
          <SideNavBar
            systemName={"Learning Management System"}
            facultyName={"Faculty Of Computing"}
          />
          
        
        <div className={style.mainContainer}>
        <div className={style.container}>{children}</div>
        {/* <div className={style.footer}></div> */}
        </div>
      </div>
    </>
  );
}
