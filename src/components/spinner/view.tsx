import styles from "./style.module.css";

interface SpinnerProps {
  width?: string;
  height?: string;
}

export default function Spinner({ width, height }: SpinnerProps) {
  return (
    <div className={styles.ldsRing} style={{ width, height }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
