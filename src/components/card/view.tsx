import style from "./style.module.css";
import Link from "next/link";

interface CardProps {
  children?: React.ReactNode;
  link?: string;
}

export default function Card({children, link}: CardProps) {
  if (link) {
    return (
      <Link href={link} style={{ textDecoration: "none" }}>
        <div className={style.card}>{children}</div>
      </Link>
    )
  }
  return <div className={style.card}>{children}</div>;
}
