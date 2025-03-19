import React from "react";
import style from "./page.module.css";
import Link from "next/link";
import ModuleCard from "@/components/module-card/module-card";
import { Module } from "@/utils/types/backend";

interface ModuleListProps {
  filteredModules: Module[];
  handleCourseClick?: (course: any) => void;
}

export default async function ModuleList({
  filteredModules,
  handleCourseClick,
}: ModuleListProps) {
  return (
    <div className={style.courseBody}>
      {filteredModules.length > 0 ? (
        filteredModules.map((module) => (
          <div key={module.id} className={style.cardWrapper}>
            <Link href={`/app/modules/${module.id}`} className={style.cardLink}>
              <ModuleCard
                id={module.id}
                imageUrl={module.image ?? "/module-cover.webp"}
                completion={0}
                name={module.module_name}
                semester={Number(module.semester)}
              />
            </Link>
          </div>
        ))
      ) : (
        <p>No modules assigned for this course</p>
      )}
    </div>
  );
}
