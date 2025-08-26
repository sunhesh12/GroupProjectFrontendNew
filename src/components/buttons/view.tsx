"use client";
import Link from "next/link";
import styles from "./style.module.css";
import { MouseEventHandler, HTMLAttributes, ReactNode } from "react";
import { Work_Sans } from "next/font/google";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../spinner/view";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export type ButtonProps = {
  children?: ReactNode;
  isLink?: boolean;
  backgroundColor?: string;
  isLoading?: boolean;
  className?: string;
  href?: string;
  width?: string;
  icon?: IconDefinition;
  fontSize?: string;
  color?: string;
  type?: "submit" | "reset" | "button";
  onClick?: MouseEventHandler<HTMLElement>;
};

export default function Button({
  children,
  isLink,
  isLoading,
  href,
  width,
  icon,
  fontSize,
  onClick,
  type,
  className,
  color,
  backgroundColor
}: ButtonProps) {
  // Any additional props
  const props: HTMLAttributes<HTMLElement> = {
    onClick,
    "aria-label": "Button",
    role: "button",
    style: { fontSize: fontSize, width: width, color, backgroundColor },
    className: styles.button + " " + workSans.className + " " + className,
  };

  if (isLink && type) throw new Error("You can't give a type for the links");

  if (!isLink) {
    return (
      <button type={type} {...props}>
        {isLoading ? (
          <Spinner theme="light" width={20} height={20} />
        ) : (
          icon && <FontAwesomeIcon width={20} height={20} icon={icon} />
        )}
        {children}
      </button>
    );
  } else {
    if (href === undefined || href === null) {
      throw new Error("href is required for link type button");
    }
    return (
      <Link href={href} {...props}>
        {icon && <FontAwesomeIcon width={20} height={20} icon={icon} />}
        {children}
      </Link>
    );
  }
}
