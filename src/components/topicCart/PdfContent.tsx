import React from "react";
import style from "./couseId.module.css";

interface PdfContentProps {
  subtopic: {
    title: string;
    description?: string;
    media: {
      pdf?: { url: string; size?: number }; // Make `pdf` optional
    };
  };
}

const PdfContent: React.FC<PdfContentProps> = ({ subtopic }) => {
  const pdf = subtopic.media.pdf;

  if (!pdf) {
    return null; // If `pdf` is undefined, do not render the component
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdf.url;
    link.download = pdf.url.split("/").pop() || "file.pdf";
    link.click();
  };

  return (
    <div className={style.subtopicItem}>
      <div className={style.subtopicLine}></div>
      <div className={style.PdfWrapper}>
        <h4>{subtopic.title}</h4>
        {subtopic.description && <p>{subtopic.description}</p>}
        <button onClick={handleDownload} className={style.DownloadButton}>
          Start Download
        </button>
      </div>
    </div>
  );
};

export default PdfContent;
