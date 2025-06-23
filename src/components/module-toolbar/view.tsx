"use client";
import { useState } from "react";
import styles from "./style.module.css";
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
import Card from "../card/view";
import MessageBox from "../messagebox/view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "../input/view";

type TopicType = "assignment" | "lecture" | "lab";

export default function TopicToolbar() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [topicVisible, setTopicVisible] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const [selection, setSelection] = useState<TopicType>("lecture");

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
        <form>
          <InputField
            name="type"
            type="select"
            options={[
              { value: "lecture", label: "Lecture" },
              { value: "assignment", label: "Assignment" },
              { value: "lab", label: "Lab" },
            ]}
            onChange={(e => setSelection(e.target.value as TopicType))} // Handle type change
          />
          <InputField type="text" name="title" label="Topic Title" />
          {selection === "assignment" && (
            <InputField
              type="date"
              name="deadline"
              label="Assignment Deadline"
            />
          )}
          <InputField
            type="textarea"
            name="description"
            label="Topic Description" 
          />
          <div id="form-controls">
            <Button type="submit">Add topic</Button>
          </div>
        </form>
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

        <NobgButton
          icon={faServer}
          color="black"
          onClick={() => handleButtonClick("systems")}
        >
          Archive course
        </NobgButton>

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
