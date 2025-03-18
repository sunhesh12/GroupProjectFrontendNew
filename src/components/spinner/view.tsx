import styles from "./style.module.css";
import Image from "next/image";

interface SpinnerProps {
  width: number;
  height: number;
  theme: "dark" | "light";
}

export default function Spinner({ width, height, theme }: SpinnerProps) {
  return (
    <Image
      src={`/icons/loading-${theme}.svg`}
      width={width}
      height={height}
      alt="A loading spinner icon"
    />
  );
}
