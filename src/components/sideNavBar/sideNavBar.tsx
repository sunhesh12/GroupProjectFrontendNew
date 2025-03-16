"use client";

import React, { useState } from "react";
import styles from "./sidenNavBar.module.css";
import { navItems } from "./navItems";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavItem from "./NavItem";
import EndDiv from "./EndDiv";

export default function SideNavBar({
  systemName = "",
  facultyName = "",
}: {
  systemName: string;
  facultyName: string;
}) {
  const [isOpen, setIsOpen] = useState(false); // Controls the side nav bar open/close

  function toggleSideNav() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={`${styles.sideNavBarContainer} ${isOpen ? styles.open : styles.closed}`}
    >
      <Logo systemName={systemName} facultyName={facultyName} isOpen={isOpen} toggleSideNav={toggleSideNav} />
      <SearchBar isOpen={isOpen} toggleSideNav={toggleSideNav} />
      
      <div className={styles.bodyContainer}>
        {navItems.map((item, index) => (
          <NavItem key={index} icon={item.icon} label={item.label} isOpen={isOpen} link={item.link} />
        ))}
      </div>

      <EndDiv isOpen={isOpen} />
    </div>
  );
}
