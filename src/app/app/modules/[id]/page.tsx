"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { topics, MainTopic } from "../../../../utils/ModuleSubtopics";
import style from "./couseId.module.css";
import AnnouncementsSection from "./nnouncementsSection";
import PinnedAnnouncementsSection from "./pinnedas";
import OtherTopicsSection from "./OtherTopicsSection";
import Image from "next/image";

interface PageProps {
  params: { id: string | undefined }; // Allow undefined to be handled properly
}

const CoursePage: React.FC<PageProps> = ({ params }) => {
  const [decodedId, setDecodedId] = useState<string | null>(null);
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({});
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState<MainTopic[]>([]); // Store pinned announcements
  const router = useRouter();

  const decodedIdParam = params?.id ?? ''; // Ensure `params` is not undefined and `id` exists

  useEffect(() => {
    if (decodedIdParam) {
      const decoded = decodeURIComponent(decodedIdParam);
      setDecodedId(decoded);
    }

    const savedStates = localStorage.getItem("openTopicsState");
    if (savedStates) {
      setOpenTopics(JSON.parse(savedStates));
    } else {
      const initialState = topics.reduce(
        (acc, topic) => ({ ...acc, [topic.id]: false }),
        {}
      );
      setOpenTopics(initialState);
    }
  }, [decodedIdParam]);

  // Toggle function for main topics
  const toggleTopic = (topicId: string) => {
    const updatedState = { ...openTopics, [topicId]: !openTopics[topicId] };
    setOpenTopics(updatedState);
    localStorage.setItem("openTopicsState", JSON.stringify(updatedState));
  };

  // Toggle pinning of announcements
  const togglePin = (mainTopic: MainTopic) => {
    if (pinnedAnnouncements.some((item) => item.id === mainTopic.id)) {
      setPinnedAnnouncements((prev) =>
        prev.filter((item) => item.id !== mainTopic.id)
      );
    } else {
      setPinnedAnnouncements((prev) => [...prev, mainTopic]);
    }
  };

  if (!decodedId) {
    return <div>Loading...</div>;
  }

  // Separate topics into categories
  const announcements = topics.filter((topic) => topic.type.toLowerCase() === "announcement");
  const otherTopics = topics.filter((topic) => topic.type.toLowerCase() !== "announcement");

  return (
    <>
      <div className={style.MainWrapperHeding}>
        <button
          onClick={() => router.back()}
          className={style.BackButton}
          aria-label="Go Back"
        >
          <Image src={"/back.ico"} alt="back button" width={30} height={30} />
        </button>
        <h1>{decodedId}</h1>
      </div>
      
      <Image className={style.courseCoverImage} src={"/courseCart.jpeg"} alt="Image" width={100} height={100} />

      <div className={style.MainWrapper}>
        
        <div className={style.container}>
          {/* Render pinned announcements at the top */}
          <PinnedAnnouncementsSection
            pinnedAnnouncements={pinnedAnnouncements}
            openTopics={openTopics}
            toggleTopic={toggleTopic}
            togglePin={togglePin}
          />

          {/* Render announcements */}
          <AnnouncementsSection
            announcements={announcements}
            openTopics={openTopics}
            toggleTopic={toggleTopic}
            togglePin={togglePin}
          />

          {/* Render other topics */}
          <OtherTopicsSection
            otherTopics={otherTopics}
            openTopics={openTopics}
            toggleTopic={toggleTopic}
            togglePin={togglePin}
          />
        </div>
        <div style={{ width: "100%", height: "200px" }}></div>
      </div>
    </>
  );
};

export default CoursePage;
