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
  width?: number | string;
  height?: number | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({ icon, color, onClick, width, height }: IconButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon={icon} width={width} height={height} size="lg" color={color} />
    </button>
  );
}
