"use client";

import { usePathname } from "next/navigation";

import UniLogo from "@/components/navbar/unilogo/view";
import NavLink from "@/components/navbar/navlink/view";
import styles from "./style.module.css";
import { useEffect, useState } from "react";


export default function NavbarView() {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if(pathname.split("/")[1] === "app") {
      setNavbarOpen(false);
    }
  }, [pathname]);

  return (
    navbarOpen && (
      <nav aria-label="Site navbar" className={styles.navbar}>
        <ul
          id="links"
          className={styles.links}
          aria-label="List of links for the navigation"
        >
          <li>
            <NavLink href="/" text="Home" icon="/icons/bx-home.svg" />
          </li>
          <li>
            <NavLink
              href="/contact"
              text="Contact"
              icon="/icons/bx-phone.svg"
            />
          </li>
          <li>
            <NavLink
              href="/help"
              text="Help"
              icon="/icons/bx-help-circle.svg"
            />
          </li>
        </ul>
        <UniLogo />
      </nav>
    )
  );
}
