"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function useIsCurrentPath(currentPath: string | undefined) {
  const pathname = usePathname();
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (pathname === currentPath) {
      setIsCurrent(true);
    } else {
      setIsCurrent(false);
    }
  }, [pathname, currentPath]);

  return {
    isCurrent,
  };
}
