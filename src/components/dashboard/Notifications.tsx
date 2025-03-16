import React from "react";
import Link from "next/link";
import style from "./dashboard.module.css";

interface Notification {
  heading: string;
  text: string;
  link: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <div className={style.NotificationsContainer}>
      {notifications.map((notification, index) => (
        <Link key={index} href={notification.link}>
          <div
            className={`${style.Notification} ${
              notification.heading === "Assignment Deadline"
                ? style.RedBackground
                : style.GreenBackground
            }`}
          >
            <div className={style.NotificationHeading}>
              <h2
                style={{
                  color:
                    notification.heading === "Assignment Deadline"
                      ? "rgb(124, 10, 10)"
                      : "rgb(12, 123,50)",
                }}
              >
                {notification.heading}
              </h2>
              <p>{notification.text}</p>
            </div>
            <div className={style.AssignmentLink}>
              <u>Go to activity</u>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Notifications;
