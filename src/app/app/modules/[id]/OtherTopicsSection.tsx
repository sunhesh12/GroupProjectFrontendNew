// OtherTopicsSection.tsx

import React from "react";
import TopicSection from "../../../../components/topicCart/TopicSection";
import style from "./couseId.module.css";
import { MainTopic } from "../../../../utils/ModuleSubtopics";

interface OtherTopicsSectionProps {
  otherTopics: MainTopic[];
  openTopics: { [key: string]: boolean };
  toggleTopic: (topicId: string) => void;
  togglePin: (mainTopic: MainTopic) => void;
}

const OtherTopicsSection: React.FC<OtherTopicsSectionProps> = ({
  otherTopics,
  openTopics,
  toggleTopic,
  togglePin,
}) => {
  return (
    otherTopics.length > 0 && (
      <div className={style.OtherTopics}>
        {otherTopics.map((mainTopic) => (
          <TopicSection
            key={mainTopic.id}
            mainTopic={mainTopic}
            openTopics={openTopics}
            toggleTopic={toggleTopic}
            togglePin={togglePin}
            isPinned={false}
          />
        ))}
      </div>
    )
  );
};

export default OtherTopicsSection;
