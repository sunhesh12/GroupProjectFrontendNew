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
} from "@fortawesome/free-solid-svg-icons";
import Card from "../card/view";

export default function TopicToolbar() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
    console.log(`${buttonName} clicked`);
  };

  return (
    <Card layout="column">
      <h3 className={styles.toolbarHeader}>Module toolbar</h3>
      <p>Change your module by adding topics, resources, assignments or any resources</p>
      <div className={styles.toolbar}>
        <Button
          icon={faPlus}
          type="button"
          fontSize="16px"
          onClick={() => console.log("Add topic clicked")}
        >
          Add Topic
        </Button>

        <NobgButton
          icon={faBullhorn}
          color="black"
          onClick={() => handleButtonClick("announcement")}
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
