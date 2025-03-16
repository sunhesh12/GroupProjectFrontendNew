import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.css";

interface CloseButtonProps {
  closeAction: () => void;
}

export default function CloseButton({ closeAction }: CloseButtonProps) {
  return (
    <button className={styles.closeButton} onClick={() => closeAction()}>
      <FontAwesomeIcon icon={faClose} size="lg" />
    </button>
  );
}
