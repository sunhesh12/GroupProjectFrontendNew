import React from "react";
import styles from "./sidenNavBar.module.css";
import Image from "next/image";

interface LogoProps {
  systemName: string;
  facultyName: string;
  isOpen: boolean;
  toggleSideNav: () => void;
}

const Logo: React.FC<LogoProps> = ({
  systemName,
  facultyName,
  isOpen,
  toggleSideNav,
}) => {
  const size = 30;
  return (
    <div
      className={`${styles.logoContainer} ${isOpen ? styles.openlogoContainer : styles.closedlogoContainer}`}
    >
      <div className={styles.logo}>
        <Image
          style={{ borderRadius: "50px" }}
          src="/logo.jpg"
          alt="Home Icon"
          width={isOpen ? 50 : size}
          height={isOpen ? 50 : size}
        />
      </div>
      <div className={styles.logoText}>
        <div className={styles.logoTextHeading}>
          <p>{isOpen ? systemName : ""}</p>
        </div>
        <div className={styles.logoTextBody}>
          <p>{isOpen ? facultyName : ""}</p>
        </div>
      </div>
      <div className={styles.toggleButtonContainer}>
        <button onClick={toggleSideNav} className={styles.toggleButton}>
          <Image
            style={{ borderRadius: "50px" }}
            src={isOpen ? "/close.png" : "/open.png"}
            alt="Toggle Icon"
            width={size}
            height={size}
          />
        </button>
      </div>
    </div>
  );
};

export default Logo;
