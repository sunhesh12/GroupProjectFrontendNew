"use client";
import dynamic from "next/dynamic";

const ModuleToolbar = dynamic(() => import("../../app/app/modules/[moduleId]/module-toolbar"), {
  ssr: false,
});

export default ModuleToolbar;