"use client";
import type { ReactNode } from "react";
import { useAppControls } from "@/hooks/use-app-controls";
import styles from "./style.module.css";
import CloseButton from "../buttons/close/view";

interface MessageBoxProps {
  children: ReactNode;
}

export default function MessageBox({ children }: MessageBoxProps) {
  const { closeMessageBox } = useAppControls();
  return (
    <div id="messageBoxContainer" className={styles.messageBoxContainer}>
      <div id="messageBox" className={styles.messageBox}>
        <div id="messageBoxTop">
          <CloseButton closeAction={() => closeMessageBox()} />
        </div>
        {children}
      </div>
    </div>
  );
}
