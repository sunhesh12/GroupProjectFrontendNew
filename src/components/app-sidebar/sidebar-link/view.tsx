"use client";

import Link from "next/link";
import style from "./style.module.css";
import Image from "next/image";
import { ReactNode, useMemo } from "react";
import type { CSSProperties, MouseEventHandler } from "react";
import useIsCurrentPath from "@/hooks/use-is-currentpath";

interface LinkIconProps {
  icon: string;
  alt: string;
  dimensions?: {
    width: number;
    height: number;
  };
  rounded?: boolean;
}

interface ComponentProps {
  className?: string;
  style: CSSProperties;
  onClick?: MouseEventHandler;
}

function LinkIcon({ icon, alt, dimensions, rounded }: LinkIconProps) {
  return (
    <Image
      alt={alt ?? "An icon"}
      className={style.linkIcon}
      src={icon}
      width={dimensions?.width ?? 15}
      height={dimensions?.height ?? 15}
      style={{
        borderRadius: rounded ? "100%" : undefined,
      }}
    />
  );
}

type SidebarLinkProps = {
  icon?: string;
  alt?: string;
  href?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  rounded?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
  expanded: boolean;
  styles?: CSSProperties;
};

export default function SidebarLink({
  icon,
  children,
  alt,
  href,
  dimensions,
  rounded,
  onClick,
  expanded,
  styles
}: SidebarLinkProps) {
  const {isCurrent: isActive} = useIsCurrentPath(href);

  // Common props for button and
  const props = useMemo<ComponentProps>(() => {
    return {
      style: {
        backgroundColor: isActive ? "#302B2B" : undefined,
        justifyContent: expanded ? "left" : "center",
        width: expanded ? "100%" : "40px",
        ...styles
      },
      onClick,
      className: style.link,
    };
  }, [isActive ,onClick, expanded]);

  if (!href) {
    return (
      <button {...props}>
        <div>
          {icon && alt && (
            <LinkIcon
              icon={icon}
              alt={alt}
              dimensions={dimensions}
              rounded={rounded}
            />
          )}
        </div>
        {expanded && <div className={style.linkText}>{children}</div>}
      </button>
    );
  }

  return (
    <Link href={href} {...props}>
      <div>
        {icon && alt && (
          <LinkIcon
            icon={icon}
            alt={alt}
            dimensions={dimensions}
            rounded={rounded}
          />
        )}
      </div>
      {expanded && <div className={style.linkText}>{children}</div>}
    </Link>
  );
}
