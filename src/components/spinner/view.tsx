"use client";
import Image from "next/image";

interface SpinnerProps {
  width: number;
  height: number;
  theme: "dark" | "light";
}

export default function Spinner({ width, height, theme }: SpinnerProps) {
  return theme === "dark" ? (
    <Image
      src={`/icons/loading-dark.svg`}
      width={width}
      height={height}
      alt="A loading spinner icon"
    />
  ) : (
    <Image
      src={`/icons/loading-light.svg`}
      width={width}
      height={height}
      alt="A loading spinner icon"
    />
  );
}
