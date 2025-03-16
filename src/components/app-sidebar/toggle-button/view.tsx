"use client";
import type { Dispatch, SetStateAction } from "react";
import styles from "@/components/app-sidebar/toggle-button/style.module.css";
import { Maximize2, Minimize2 } from "react-feather";

interface ToggleButtonProps {
  expanded: boolean;
  toggleExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function ToggleButton({
  expanded,
  toggleExpanded,
}: ToggleButtonProps) {
  return (
    <button
      onClick={() => {
        toggleExpanded((prevExpandState) => !prevExpandState);
      }}
      className={styles.expandMinimizeButton}
    >
      {expanded ? (
        <Minimize2 size={20} color="white" />
      ) : (
        <Maximize2 size={20} color="white" />
      )}
    </button>
  );
}
