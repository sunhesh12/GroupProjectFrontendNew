"use client";

import React from "react";
import { MainTopic, Subtopic } from "../../utils/ModuleSubtopics";
import style from "./couseId.module.css";
import RenderContent from "./RenderContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBell,
  faThumbTack,
  faThumbTackSlash,
  faCircleQuestion,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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
  const topicStyle: {
    title: string;
    background: string;
    color: string;
    icon: any;
  } = {
    title: "",
    background: "",
    color: "black",
    icon: faBook,
  };
  switch (mainTopic.type.toLowerCase()) {
    case "lesson":
      topicStyle.title = "Lesson";
      topicStyle.background = "#81D6E3";
      topicStyle.icon = faBook;
      break;
    case "announcement":
      topicStyle.title = "Announcement";
      topicStyle.background = "#2364AA";
      topicStyle.color = "white";
      topicStyle.icon = faBell;
      break;
    case "assignment":
      topicStyle.title = "Assignment";
      topicStyle.background = "#883677";
      topicStyle.icon = faCircleQuestion;
      topicStyle.color = "white";
      break;
    default:
      topicStyle.title = "Default Topic";
      topicStyle.background = "#D9DCD6";
      topicStyle.icon = faBook;
      break;
  }

  return (
    <div
      className={style.TopicContainer}
      style={{
        backgroundColor: topicStyle.background,
        color: topicStyle.color,
      }}
    >
      <div
        className={style.TopicHeading}
        onClick={() => toggleTopic(mainTopic.id)}
      >
        <div className={style.HeadTopic}>
          <FontAwesomeIcon icon={topicStyle.icon} />
          &nbsp;&nbsp;
          <h1>
            {topicStyle.title} - {mainTopic.title}
          </h1>
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
              <FontAwesomeIcon icon={faThumbTackSlash} size="lg" color={topicStyle.color} />
          ) : (
              <FontAwesomeIcon icon={faThumbTack} size="lg" color={topicStyle.color} />
          )}
        </button>
          {openTopics[mainTopic.id] ? (
            <FontAwesomeIcon icon={faChevronUp} color={topicStyle.color} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color={topicStyle.color} />
          )}
      </div>

      {/* Render only when open */}
      {openTopics[mainTopic.id] && (
        <div className={style.SubtopicList}>
          {/* Display "Learning Materials" */}
          <p className={style.LearningMaterials}>Learning Materials</p>

          {/* Map through subtopics */}
          {mainTopic.subtopics.map((subtopic: Subtopic) => (
            <div key={subtopic.id} style={{color: topicStyle.color}} className={style.Subtopic}>
              <RenderContent subtopic={subtopic} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicSection;
