"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./style.module.css";
import useIsCurrentPath from "@/hooks/use-is-currentpath";
import { CSSProperties } from "react";
import Line from "@/components/line/view";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface TabProps {
  href: string;
  label: string;
  icon?: IconDefinition;
}

export default function TabButton({ href, label, icon }: TabProps) {
  const { isCurrent } = useIsCurrentPath(href);
  const style: CSSProperties = {
    borderBottom: isCurrent ? "3px solid black" : undefined,
  };
  return (
      <Link href={href} className={styles.tabButton} style={style}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {label}
      </Link>
  );
}
