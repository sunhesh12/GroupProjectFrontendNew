"use client";

import {
  faBell,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../buttons/icon/view";
import styles from "./style.module.css";
import { useState } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import Card from "../card/view";

interface PanelProps {
  children?: React.ReactNode;
  icon?: FontAwesomeIconProps["icon"];
  header: string;
}

export default function Panel({ children, header, icon }: PanelProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <div
        className={styles.panelHeader}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <h2 className={styles.panelHeaderText}>
          {icon && <FontAwesomeIcon icon={icon} size="sm" />}&nbsp;&nbsp;
          <span>{header}</span>
        </h2>
        <div className={styles.panelHeaderButtons}>
          {expanded ? (
            <IconButton icon={faChevronUp} color="black" />
          ) : (
            <IconButton icon={faChevronDown} color="black" />
          )}
        </div>
      </div>
      {expanded && <div className={styles.panelContent}>{children}</div>}
    </Card>
  );
}
