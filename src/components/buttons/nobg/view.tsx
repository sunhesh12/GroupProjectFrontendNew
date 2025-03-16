"use client";
import Button from "@/components/buttons/view";
import type { MouseEventHandler, ReactNode } from "react";
import styles from "./style.module.css";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface ToobarButtonProps {
  children?: ReactNode;
  icon: IconDefinition;
  onClick?: MouseEventHandler<HTMLElement>;
}

export default function 
NobgButton({
  children,
  icon,
  onClick,
}: ToobarButtonProps) {
  return (
    <Button icon={icon} className={styles.toolbarButton} onClick={onClick}>
      {children}
    </Button>
  );
}
