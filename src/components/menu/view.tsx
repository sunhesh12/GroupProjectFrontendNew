"use client";
import styles from "./style.module.css";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEventHandler,
} from "react";
import SidebarLink from "../app-sidebar/sidebar-link/view";

type Options = {
  name: string;
  action: MouseEventHandler;
  styles?: CSSProperties;
}[];

interface MenuProps {
  options: Options;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  onClose: () => void;
}

export default function Menu({ options, position, onClose }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // This piece of code is used to close the menu when clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = ref.current;
      if (menuElement && !menuElement.contains(event.target as Node) && !document.getElementById("profile-pic")?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <div
      id="menu"
      className={styles.menu}
      ref={ref}
      style={{
        top: position?.top,
        left: position?.left,
        right: position?.right,
        bottom: position?.bottom,
      }}
    >
      <ul className={styles.menuList}>
        {options.map(({ name, action, styles }, index) => (
          <SidebarLink
            key={index}
            onClick={action}
            styles={styles}
            expanded={true}
          >
            {name}
          </SidebarLink>
        ))}
      </ul>
    </div>
  );
}
