"use client";

import { createContext, useState, useContext, useCallback } from "react";
import type { ReactNode } from "react";
import AppSidebar from "@/components/app-sidebar/view";
import styles from "@/app/app/layout.module.css";
import MessageBox from "@/components/messagebox/view";

interface AppControls {
  messageBoxContent: ReactNode;
  toggleSidebar: () => void;
  closeMessageBox: () => void;
  openMessageBox: (content: ReactNode) => void;
}

const AppControlsContext = createContext<AppControls | null>(null);

export function useAppControls() {
  const controls = useContext(AppControlsContext);

  if (!controls) throw new Error("App controls haven't been initialized");

  return {
    ...controls,
  };
}

export function AppControls({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState(true);
  const [messageBoxContent, setMessageBoxContent] = useState<ReactNode>(null);

  const toggleSidebar = useCallback(() => {
    setSidebar((prev) => !prev);
  }, []);

  const openMessageBox = useCallback((children: ReactNode) => {
    console.log(children);
    setMessageBoxContent(children);
  }, []);

  const closeMessageBox = useCallback(() => {
    setMessageBoxContent(null);
  }, []);

  return (
    <AppControlsContext.Provider
      value={{
        messageBoxContent,
        toggleSidebar,
        openMessageBox,
        closeMessageBox,
      }}
    >
      <div id="appContainer" className={styles.main}>
        {messageBoxContent !== null && (
          <MessageBox>{messageBoxContent}</MessageBox>
        )}
        <div id="appSidebar">
          <AppSidebar expanded={sidebar} toggleExpanded={setSidebar} />
        </div>
        <div
          id="appContent"
          className={styles.content}
          style={{
            marginLeft: sidebar ? "300px" : "70px",
            width: sidebar ? "calc(100vw - 300px)" : "calc(100vw - 70px) ",
          }}
        >
          {children}
        </div>
      </div>
    </AppControlsContext.Provider>
  );
}
