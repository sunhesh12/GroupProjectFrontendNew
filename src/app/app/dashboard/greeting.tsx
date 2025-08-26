"use client";
import useTime from "@/hooks/use-time";
import { style } from "motion/react-client";
import styles from "./page.module.css"

interface GreetingProps {
  name: string;
}

export default function Greeting({ name }: GreetingProps) {
  const { isMorning } = useTime();
  return (
    <>
      <div className={styles.greetingWrapper}>
        <h1>{isMorning ? `Good morning ` : `Good evening `}</h1>
        <p>{name}</p>
      </div>
    </>
  );
}
