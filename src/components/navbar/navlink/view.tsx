import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import styles from "./style.module.css";

type NavLinkProps = {
  href: string;
  text: string;
  icon: string;
};

export default function NavLink({ href, text, icon }: NavLinkProps) {
  return (
    <Fragment>
      <Link href={href} className={styles.navLink}>
        <Image src={icon} alt="Home Icon" width={25} height={25} />
        {text}
      </Link>
    </Fragment>
  );
}
