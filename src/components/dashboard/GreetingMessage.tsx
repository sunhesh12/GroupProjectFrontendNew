import React from "react";
import style from "./dashboard.module.css";

interface GreetingMessageProps {
  userName: string | null;
}

const GreetingMessage: React.FC<GreetingMessageProps> = ({ userName }) => {
  
  return (
    <div className={style.GreetingMessage}>
      <h1>
        Good Morning <span>{userName || "Guest"}</span>
      </h1>
    </div>
  );
};

export default GreetingMessage;
