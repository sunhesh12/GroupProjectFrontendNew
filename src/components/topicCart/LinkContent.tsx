import React from "react";
import Link from "next/link";
import style from "./couseId.module.css";

interface LinkContentProps {
  subtopic: {
    title: string;
    description?: string;
    media: {
      link?: { url: string; label: string };
    };
  };
}

const LinkContent: React.FC<LinkContentProps> = ({ subtopic }) => {
  const link = subtopic.media.link;

  if (!link) {
    return null; 
  }

  return (
    <div className={style.subtopicItem}>
      <div className={style.subtopicLine}></div>
      <div className={style.LinkWrapper}>
        <h4>{subtopic.title}</h4>
        {subtopic.description}
        <Link
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={style.LinkButton}
        >
          {link.label || "Open Link"}
        </Link>
      </div>
    </div>
  );
};

export default LinkContent;
