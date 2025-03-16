import React from "react";
import Image from "next/image";
import style from "./couseId.module.css";

interface ImageContentProps {
  subtopic: {
    title: string;
    description?: string;
    media: {
      image?: { url: string; altText?: string }; // Make `image` optional
    };
  };
}

const ImageContent: React.FC<ImageContentProps> = ({ subtopic }) => {
  const image = subtopic.media.image;

  if (!image) {
    return null; // If `image` is undefined, do not render the component
  }

  return (
    <div className={style.subtopicItem}>
      <div className={style.subtopicLine}></div> {/* Vertical line */}
      <div className={style.subtopicContent}>
        <h4>{subtopic.title}</h4>
        {subtopic.description && <p>{subtopic.description}</p>}
        <div className={style.ImageWrapper}>
          <Image
            src={image.url}
            alt={image.altText || `Image: ${subtopic.title}`}
            width={500}
            height={300}
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
