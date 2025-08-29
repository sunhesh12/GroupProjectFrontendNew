"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import AppSidebar from "@/components/app-sidebar/view";
import styles from "@/app/app/layout.module.css";
import useSession from "@/hooks/use-session";

export default function AppRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [sidebar, setSidebar] = useState(true);
  const {user, loading} = useSession();

  return (
      <div id="appContainer" className={styles.main}>
        <div id="appSidebar">
          <AppSidebar expanded={sidebar} toggleExpanded={setSidebar} user={user} />
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
  );
}