import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.css";

interface MessageProps {
  message: string;
  type: "success" | "error" | "info";
}

export default function Message({ message, type }: MessageProps) {
  return (
    <div className={styles.message} style={{ color: type === "error" ? "red" : "green" }}>
      {type === "success" && (
        <FontAwesomeIcon icon={faCircleCheck} width={20} height={20} />
      )}{" "}
      {type === "error" && (
        <FontAwesomeIcon icon={faCircleXmark} width={20} height={20} />
      )}
      {type === "info" && (
        <FontAwesomeIcon icon={faCircleExclamation} width={20} height={20} />
      )}
      {message}
    </div>
  );
}
