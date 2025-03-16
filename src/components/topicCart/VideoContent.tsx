import React from "react";
import style from "./couseId.module.css";
import Link from "next/link";


const getVideoPlatformIcon = (url: string) => {
 
};

interface VideoContentProps {
  subtopic: {
    title: string;
    description?: string;
    media: {
      video?: { url: string; type: "embed" | "youtube" | "vimeo" };
    };
  };
}

const VideoContent: React.FC<VideoContentProps> = ({ subtopic }) => {
  const video = subtopic.media.video;

  if (!video) {
    return null; // Handle the case where video is undefined
  }

  return (
    <div className={style.subtopicItem}>
      <div className={style.subtopicLine}></div>
      <div className={style.subtopicContent}>
        <h4>{subtopic.title}</h4>
        {subtopic.description}
        <div className={style.VideoWrapper}>
          <iframe
            src={video.url}
            title={`Video: ${subtopic.title}`}
            width="100%"
            height="auto"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Link href={video.url} target="_blank">
          <div className={style.videoIcon}>
            {getVideoPlatformIcon(video.url)}
            {subtopic.description}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoContent;
