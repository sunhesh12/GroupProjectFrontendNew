import style from "./style.module.css";
import Link from "next/link";

interface CardProps {
  children?: React.ReactNode;
  layout?: "row" | "column";
  gap?: string;
  link?: string;
}

export default function Card({ children, link, layout, gap }: CardProps) {
  const styles = {
    textDecoration: "none",
    display: "flex",
    flexDirection: layout ? layout : "column",
    gap: gap ? gap : "5px",
  };
  if (link) {
    return (
      <Link href={link} style={styles}>
        <div className={style.card}>{children}</div>
      </Link>
    );
  }
  return (
    <div className={style.card} style={styles}>
      {children}
    </div>
  );
}
