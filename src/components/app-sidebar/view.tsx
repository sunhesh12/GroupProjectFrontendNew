"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import SidebarLink from "./sidebar-link/view";
import InputField from "@/components/input/view";
import ToggleButton from "./toggle-button/view";
import Menu from "@/components/menu/view";

interface AppSidebarProps {
  expanded: boolean;
  toggleExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function AppSidebar({
  expanded,
  toggleExpanded,
}: AppSidebarProps) {
  const [sessionMenu, toggleSessionMenu] = useState(false);
  const { data: session } = useSession();
  return (
    <aside
      className={styles.sidebar}
      style={{
        width: expanded ? "300px" : "70px",
        alignItems: expanded ? "unset" : "center",
      }}
    >
      <header className={styles.sidebarHeaderContainer}>
        <div
          className={styles.title}
          style={{
            justifyContent: expanded ? "left" : "center",
            flexDirection: expanded ? "row" : "column",
            gap: expanded ? undefined : "20px",
          }}
        >
          <Image
            src="/unilogo.webp"
            alt="Logo of University Of Sri Jayewardenepura"
            width="40"
            height="35"
          />
          {expanded && (
            <div>
              <h2 className={styles.sidebarHeader}>
                Learning management system
              </h2>
              <h3 className={styles.sidebarSubHeader}>Faculty of computing</h3>
            </div>
          )}
          <ToggleButton expanded={expanded} toggleExpanded={toggleExpanded} />
        </div>
        {expanded && (
          <form className={styles.searchForm}>
            <InputField
              type="text"
              backgroundColor="#141414"
              borderColor="#343434"
              color="white"
              name="Search anything"
              placeholder="Search"
            />
          </form>
        )}
      </header>
      <nav className={styles.nav}>
        {expanded && (
          <header>
            <h2 className={styles.navHeader}>Navigation</h2>
          </header>
        )}
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <SidebarLink
              icon="/icons/home.svg"
              alt="An icon of a home"
              href="/app/dashboard"
              expanded={expanded}
            >
              Dashboard
            </SidebarLink>
          </li>
          <li className={styles.navItem}>
            <SidebarLink
              icon="/icons/calendar.svg"
              alt="An icon of a calendar"
              href="/app/calendar"
              expanded={expanded}
            >
              Calendar
            </SidebarLink>
          </li>
          <li className={styles.navItem}>
            <SidebarLink
              icon="/icons/book.svg"
              alt="An icon of a book"
              href="/app/modules"
              expanded={expanded}
            >
              Modules
            </SidebarLink>
          </li>
          <li className={styles.navItem}>
            <SidebarLink
              icon="/icons/exams.svg"
              alt="An icon of a exam"
              href="/app/examinations"
              expanded={expanded}
            >
              Examinations
            </SidebarLink>
          </li>
          <li className={styles.navItem}>
            <SidebarLink
              icon="/icons/message.svg"
              alt="An icon of with a letter"
              href="/app/messages"
              expanded={expanded}
            >
              Messages
            </SidebarLink>
          </li>
          <div id="profile-data" className={styles.profileContainer}>
            <SidebarLink
              icon="/icons/gear-solid.svg"
              alt="An icon of a cog wheel"
              href="/app/settings"
              expanded={expanded}
            >
              Settings
            </SidebarLink>
            <div className={styles.profile}>
              <div id="profile-pic">
                {sessionMenu && (
                  <Menu
                    position={{
                      right: "0px",
                      bottom: "60px",
                    }}
                    options={[
                      {
                        name: "Profile",
                        action: () => {

                        },
                      },
                      {
                        name: "Sign out",
                        action: () => {
                          signOut();
                        },
                        styles: {
                          color: "red",
                        },
                      },
                    ]}
                  />
                )}
                <SidebarLink
                  icon={"/icons/user.svg"}
                  alt="An image of a person"
                  dimensions={{ width: 30, height: 30 }}
                  rounded={true}
                  onClick={() => {
                    toggleSessionMenu((sessionMenu) => !sessionMenu);
                  }}
                  expanded={expanded}
                >
                  <div className={styles.username}>{session?.user.name}</div>
                  <div className={styles.email}>{session?.user.email}</div>
                </SidebarLink>
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </aside>
  );
}
