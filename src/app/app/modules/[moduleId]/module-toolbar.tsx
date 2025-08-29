"use client";
import { useState } from "react";
import styles from "./module-toolbar.module.css";
import Button from "@/components/buttons/view";
import NobgButton from "@/components/buttons/nobg/view";
import {
  faPlus,
  faBullhorn,
  faCode,
  faServer,
  faGear,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../../../components/card/view";
import MessageBox from "../../../../components/messagebox/view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopicForm from "@/app/app/modules/[moduleId]/topic-form";
import archiveModule from "@/actions/archive-module";
import { Topic } from "@/utils/types/backend";

interface TopicToolbarProps {
  moduleId: string;
  topicUpdate: (action: Topic) => void;
}

export default function TopicToolbar({moduleId, topicUpdate}: TopicToolbarProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [topicVisible, setTopicVisible] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
    console.log(`${buttonName} clicked`);
  };

  return (
    <Card layout="column">
      <MessageBox
        visible={topicVisible}
        closeAction={() => setTopicVisible(false)}
      >
        <h2>
          <FontAwesomeIcon icon={faBook} /> Create a new Topic
        </h2>
        <p>
          Add a new topic to provide necessary guidance and lecture materials
          for a module lesson
        </p>
        <TopicForm topicUpdate={topicUpdate} moduleId={moduleId} />
      </MessageBox>
      <MessageBox
        visible={announcementVisible}
        closeAction={() => setAnnouncementVisible(false)}
      >
        <p>Add new topics</p>
      </MessageBox>
      <h3 className={styles.toolbarHeader}>Module toolbar</h3>
      <p>
        Change your module by adding topics, resources, assignments or any
        resources
      </p>
      <div className={styles.toolbar}> 
        <Button
          icon={faPlus}
          type="button"
          fontSize="16px"
          onClick={() => setTopicVisible(true)}
        >
          Add Topic
        </Button>

        <NobgButton
          icon={faBullhorn}
          color="black"
          onClick={() => setAnnouncementVisible(true)}
        >
          Post Announcement
        </NobgButton>

        <NobgButton
          icon={faCode}
          color="black"
          onClick={() => handleButtonClick("programming")}
        >
          Create assignment
        </NobgButton>

        <Button
          icon={faServer}
          backgroundColor="#B22222"
          onClick={() => archiveModule(moduleId)}
        >
          Archive course
        </Button>

        <NobgButton
          icon={faGear}
          color="black"
          onClick={() => handleButtonClick("other")}
        >
          Course settings
        </NobgButton>
      </div>
    </Card>
  );
}
