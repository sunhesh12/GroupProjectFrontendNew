"use client";
import Button from "@/components/buttons/view";
import type { MouseEventHandler, ReactNode } from "react";
import styles from "./style.module.css";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface ToobarButtonProps {
  children?: ReactNode;
  icon: IconDefinition;
  color?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

export default function 
NobgButton({
  children,
  icon,
  color,
  onClick,
}: ToobarButtonProps) {
  return (
    <Button icon={icon} className={styles.toolbarButton} color={color} onClick={onClick}>
      {children}
    </Button>
  );
}
