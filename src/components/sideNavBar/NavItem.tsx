import React from "react";
import styles from "./sidenNavBar.module.css";
import Link from "next/link";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  link: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isOpen, link }) => {
  return (
    <Link href={link}>
      <div className={styles.navItem}>
        <span className={styles.icon}>{icon}</span>
        {isOpen && <span className={styles.label}>{label}</span>}
      </div>
    </Link>
  );
};

export default NavItem;
