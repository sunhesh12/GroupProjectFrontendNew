"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { topics, MainTopic } from "../../../../utils/ModuleSubtopics";
import style from "./page.module.css";
import AnnouncementsSection from "./nnouncementsSection";
import PinnedAnnouncementsSection from "./pinnedas";
import OtherTopicsSection from "./OtherTopicsSection";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircle,
  faDotCircle,
  faCircleCheck,
  faPlus,
  faPenToSquare,
  faCircleXmark,
  faTrash,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { Module } from "@/utils/types/backend";
import { useAppControls } from "@/hooks/use-app-controls";
import NobgButton from "@/components/buttons/nobg/view";
import Button from "@/components/buttons/view";

interface ConentProps {
  module: Module; // Allow undefined to be handled properly
}

export default function ModulePage({ module }: ConentProps) {
  const [decodedId, setDecodedId] = useState<string | null>(null);
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({});
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState<MainTopic[]>(
    []
  ); // Store pinned announcements
  const router = useRouter();
  const { openMessageBox } = useAppControls();

  const decodedIdParam = module.id; // Ensure `params` is not undefined and `id` exists

  useEffect(() => {
    if (decodedIdParam) {
      const decoded = decodeURIComponent(decodedIdParam);
      setDecodedId(decoded);
    }

    const savedStates = localStorage.getItem("openTopicsState");
    if (savedStates) {
      setOpenTopics(JSON.parse(savedStates));
    } else {
      const initialState = module.activities?.reduce(
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

  // Separate topics into categories
  const announcements = topics.filter(
    (topic) => topic.type.toLowerCase() === "announcement"
  );
  const otherTopics = topics.filter(
    (topic) => topic.type.toLowerCase() !== "announcement"
  );

  return (
    <>
      <nav className={style.Navbar}>
        <button
          onClick={() => router.back()}
          className={style.BackButton}
          aria-label="Go Back"
        >
          <FontAwesomeIcon icon={faArrowLeft} color="black" size="lg" />
        </button>
        <h1 className={style.courseName}>{module.module_name}</h1>
        <Link href={`/app/profile/2`} className={style.LecturerName}>
          Prof. M.G. Perera
        </Link>
        <div style={{ marginLeft: "600px" }}>
          <NobgButton
            icon={faPenToSquare}
            onClick={() =>
              openMessageBox(
                <div
                  style={{
                    color: "green",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    gap: "30px",
                  }}
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      width={20}
                      height={20}
                    />
                    Quiz submitted successfully
                    <br />
                  </div>
                  <Button fontSize="15px">Go to module</Button>
                </div>
              )
            }
          >
            Update course
          </NobgButton>
        </div>
      </nav>
      <div className={style.MainWrapperHeding}></div>
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
          <br />

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
}
