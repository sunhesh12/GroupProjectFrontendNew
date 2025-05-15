"use client";
import styles from "./style.module.css";
import type { CSSProperties, MouseEventHandler } from "react";
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
}

export default function Menu({ options, position }: MenuProps) {
  return (
    <div
      id="menu"
      className={styles.menu}
      style={{
        top: position?.top,
        left: position?.left,
        right: position?.right,
        bottom: position?.bottom,
      }}
    >
      <ul className={styles.menuList}>
        {options.map(({ name, action, styles }, index) => (
          <SidebarLink key={index} onClick={action} styles={styles} expanded={true}>
            {name}
          </SidebarLink>
        ))}
      </ul>
    </div>
  );
}
