import React from "react";
import styles from "./settings.module.css";
import { NotificationsData } from "./type";

interface NotificationsProps {
  notifications: NotificationsData;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditable: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  handleCheckboxChange,
  isEditable,
}) => (
  <div className={styles.notifications}>
    <label>
      <input
        type="checkbox"
        name="email"
        checked={notifications.email}
        onChange={handleCheckboxChange}
        disabled={!isEditable}
      />
      Email Notifications
    </label>
    <label>
      <input
        type="checkbox"
        name="push"
        checked={notifications.push}
        onChange={handleCheckboxChange}
        disabled={!isEditable}
      />
      Push Notifications
    </label>
    <label>
      <input
        type="checkbox"
        name="sms"
        checked={notifications.sms}
        onChange={handleCheckboxChange}
        disabled={!isEditable}
      />
      SMS Notifications
    </label>
  </div>
);

export default Notifications;
