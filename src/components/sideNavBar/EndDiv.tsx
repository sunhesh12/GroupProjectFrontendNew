import React from "react";
import styles from "./sidenNavBar.module.css";
import NavItem from "./NavItem";
import Image from "next/image";

interface EndDivProps {
  isOpen: boolean;
}

const EndDiv: React.FC<EndDivProps> = ({ isOpen }) => {
  const size = 30;

  return (
    <div className={styles.endDiv}>
      <div className={styles.settingDiv}>
        <NavItem
          icon={
            <Image
              src="/Settings.ico"
              alt="Settings Icon"
              width={size}
              height={size}
            />
          }
          label={"Settings"}
          isOpen={isOpen}
          link="/settings" // Pass the link directly to the NavItem component
        />
      </div>
      <div className={styles.profile}>
        {/* Profile section (future development) */}
      </div>
    </div>
  );
};

export default EndDiv;
