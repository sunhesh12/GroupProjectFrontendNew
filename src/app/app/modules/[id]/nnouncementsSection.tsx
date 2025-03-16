// AnnouncementsSection.tsx

import React from "react";
import TopicSection from "../../../../components/topicCart/TopicSection";
import style from "./couseId.module.css";
import { MainTopic } from "../../../../utils/ModuleSubtopics";

interface AnnouncementsSectionProps {
  announcements: MainTopic[];
  openTopics: { [key: string]: boolean };
  toggleTopic: (topicId: string) => void;
  togglePin: (mainTopic: MainTopic) => void;
}

const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
  openTopics,
  toggleTopic,
  togglePin,
}) => {
  return (
    announcements.length > 0 && (
      <div className={style.Announcements}>
        <h3>Announcements</h3>
        {announcements.map((mainTopic) => (
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

export default AnnouncementsSection;
