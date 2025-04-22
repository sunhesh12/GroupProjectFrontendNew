"use client";

import { MouseEventHandler } from "react";
import styles from "./style.module.css";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface IconButtonProps {
  icon: FontAwesomeIconProps["icon"];
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({ icon, color, onClick }: IconButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon={icon} width={20} height={20} size="lg" color={color} />
    </button>
  );
}
