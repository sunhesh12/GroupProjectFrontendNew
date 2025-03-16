import styles from "./styles.module.css";

interface LineProps {
  width: string;
  backgroundColor: string;
  top: string;
}

export default function Line({ width, backgroundColor, top }: LineProps) {
  return <div className={styles.line} style={{ backgroundColor, width, position: "relative", top }}></div>;
}
