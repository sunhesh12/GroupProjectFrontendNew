"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./sidenNavBar.module.css";

interface SearchBarProps {
  isOpen: boolean;
  toggleSideNav: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, toggleSideNav }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const size = 30;
  const [hydrated, setHydrated] = useState(false); // To track hydration

  // Ensure the component only renders after hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Focus the input after the input field is rendered and visible
  useEffect(() => {
    if (isOpen && hydrated) {
      inputRef.current?.focus(); // Focus the input field when the sidebar is open
    }
  }, [isOpen, hydrated]);

  // Avoid rendering until hydration is complete
  if (!hydrated) return null;

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchbarwrapper}>
        <div className={styles.searchIcon} onClick={toggleSideNav}>
          <Image
            style={{ borderRadius: "50px" }}
            src="/search.png"
            alt="Search Icon"
            width={size}
            height={size}
          />
        </div>
        {isOpen && (
          <div className={styles.inputContainer}>
            <input ref={inputRef} placeholder="Search anything" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
