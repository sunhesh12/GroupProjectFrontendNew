"use client";

import React, { useEffect, useState } from "react";
// import style from "./couseId.module.css";
import { Subtopic } from "@/utils/ModuleSubtopics";
import AssignmentQuizContent from "./AssignmentQuizContent";
import VideoContent from "./VideoContent";
import LinkContent from "./LinkContent";
import PdfContent from "./PdfContent";
import ImageContent from "./ImageContent";
import { useRouter } from "next/navigation";

interface RenderContentProps {
  subtopic: Subtopic; 
}

const RenderContent: React.FC<RenderContentProps> = ({ subtopic }) => {

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname); // Get the current URL
    }
  }, []);

  if (!currentPath) return null; // Avoid rendering until currentPath is set

  const dynamicUrl = `${currentPath}/${subtopic.type}/${subtopic.id}`; // Construct the dynamic URL


  if (subtopic.type === "assignment" || subtopic.type === "quiz") {
    return <AssignmentQuizContent subtopic={subtopic} url={dynamicUrl}/>;
  }

  if (subtopic.media.video) {
    return <VideoContent subtopic={subtopic} />;
  }

  if (subtopic.media.link) {
    return <LinkContent subtopic={subtopic} />;
  }

  if (subtopic.media.pdf) {
    return <PdfContent subtopic={subtopic} />;
  }

  if (subtopic.media.image) {
    return <ImageContent subtopic={subtopic} />;
  }

  return <p>{subtopic.description}</p>;
};

export default RenderContent;
