"use client";
import { CSSProperties } from "react";
import styles from "./style.module.css";
import TabButton from "./tab-button/view";
import Line from "../line/view";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface TabProps {
  tabs: {
    href: string;
    label: string;
    icon: IconDefinition;
  }[];
  style?: CSSProperties;
}

export default function Tab({ tabs, style }: TabProps) {
  return (
    <div id="tabSelectorContainer">
      <div id="tabSelector" className={styles.tabSelector} style={style}>
        {tabs.map(({ label, href, icon }, index) => (
          <TabButton key={index} label={label} href={href} icon={icon}/>
        ))}
      </div>
      <Line width="100%" backgroundColor="rgb(236, 235, 235)" top="0px" />
    </div>
  );
}
