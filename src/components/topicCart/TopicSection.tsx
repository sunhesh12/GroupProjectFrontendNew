"use client";

import React from "react";
import Image from "next/image";
import { MainTopic, Subtopic } from "../../utils/ModuleSubtopics";
import style from "./couseId.module.css";
import RenderContent from "./RenderContent";

interface TopicSectionProps {
  mainTopic: MainTopic;
  openTopics: { [key: string]: boolean };
  toggleTopic: (topicId: string) => void;
  togglePin: (topic: MainTopic) => void; // Function to toggle pin
  isPinned: boolean; // Whether the topic is pinned
}

const TopicSection: React.FC<TopicSectionProps> = ({
  mainTopic,
  openTopics,
  toggleTopic,
  togglePin,
  isPinned,
}) => {
  // Get the background color based on the subtopic type
  const getBackgroundColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "lesson":
        return "#d4edda"; // Light green
      case "announcement":
        return "#f8d7da"; // Light red
      case "assignment":
        return "#ffffff"; // White (default)
      default:
        return "#f5f5f5"; // Light gray for other types
    }
  };

  return (
    <div
      className={style.TopicContainer}
      style={{ backgroundColor: getBackgroundColor(mainTopic.type) }}
    >
      <div
        className={style.TopicHeading}
        onClick={() => toggleTopic(mainTopic.id)}
      >
        <div className={style.HeadTopic}>
          <h1>{mainTopic.title}</h1>
        </div>

        {/* Pin Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering toggleTopic
            togglePin(mainTopic); // Toggle pinning for this topic
          }}
          className={style.PinButton}
          aria-label={`Pin ${mainTopic.title}`}
        >
          {isPinned ? (
            <h3 style={{ display: "flex", height: "30px", margin: "10px" }}>
              <Image src={"/pin.ico"} alt={"pin icon"} width={20} height={20} />
            </h3>
          ) : (
            <h3 style={{ display: "flex", height: "30px", margin: "10px" }}>
              <Image
                src={"/unpin.ico"}
                alt={"pin icon"}
                width={20}
                height={20}
              />
            </h3>
          )}
        </button>

        {/* Toggle expand/collapse button */}
        <button
          className="Button"
          aria-expanded={openTopics[mainTopic.id]}
          aria-label={`Toggle ${mainTopic.title}`}
        >
          <Image
            src={openTopics[mainTopic.id] ? "/up.png" : "/down.png"}
            alt={openTopics[mainTopic.id] ? "Collapse" : "Expand"}
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* Render only when open */}
      {openTopics[mainTopic.id] && (
        <div className={style.SubtopicList}>
          {/* Display "Learning Materials" */}
          <p className={style.LearningMaterials}>Learning Materials</p>

          {/* Map through subtopics */}
          {mainTopic.subtopics.map((subtopic: Subtopic) => (
            <div key={subtopic.id} className={style.Subtopic}>
              <RenderContent subtopic={subtopic} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicSection;
