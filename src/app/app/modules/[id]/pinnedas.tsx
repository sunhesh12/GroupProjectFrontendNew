import React from "react";
import TopicSection from "../../../../components/topicCart/TopicSection";
import style from "./couseId.module.css";
import { MainTopic } from "../../../../utils/ModuleSubtopics";
import Image from "next/image";

interface PinnedAnnouncementsSectionProps {
  pinnedAnnouncements: MainTopic[];
  openTopics: { [key: string]: boolean };
  toggleTopic: (topicId: string) => void;
  togglePin: (mainTopic: MainTopic) => void;
}

const PinnedAnnouncementsSection: React.FC<PinnedAnnouncementsSectionProps> = ({
  pinnedAnnouncements,
  openTopics,
  toggleTopic,
  togglePin,
}) => {
  return (
    pinnedAnnouncements.length > 0 && (
      <div className={style.PinnedAnnouncements}>
        <h3 style={{ display: "flex", height: "30px", margin: "10px" }}>
          <Image src={"/pin.ico"} alt={"pin icon"} width={20} height={20} />
          Pinned
        </h3>
        {pinnedAnnouncements.map((mainTopic) => (
          <TopicSection
            key={mainTopic.id}
            mainTopic={mainTopic}
            openTopics={openTopics}
            toggleTopic={toggleTopic}
            togglePin={togglePin}
            isPinned={true}
          />
        ))}
      </div>
    )
  );
};

export default PinnedAnnouncementsSection;
