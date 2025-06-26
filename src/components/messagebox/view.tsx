"use client";
import {type ReactNode } from "react";
import styles from "./style.module.css";
import CloseButton from "../buttons/close/view";

interface MessageBoxProps {
  visible: boolean;
  children?: ReactNode;
  closeAction: () => void;
}

export default function MessageBox({
  children,
  closeAction,
  visible,
}: MessageBoxProps) {
  if (!visible) {
    return <></>;
  }

  return (
    <div id="messageBoxContainer" className={styles.messageBoxContainer}>
      <div id="messageBox" onClick={() => null} className={styles.messageBox}>
        <div id="messageBoxTop">
          <CloseButton closeAction={closeAction} />
        </div>
        {children}
      </div>
    </div>
  );
}
