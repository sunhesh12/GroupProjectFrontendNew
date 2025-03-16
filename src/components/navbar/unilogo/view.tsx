import Image from "next/image";
import styles from "./style.module.css";
export default function UniLogo() {
  return (
    <div
      id="logo"
      aria-label="Contains the university logo and university name of University Of Sri Jayawardenepura"
	  className={styles.logo}
    >
      <Image
        aria-label="Logo of University Of Sri Jayewardenepura"
        src="/unilogo.webp"
        alt="The logo of University Of Sri Jayawardenepura"
        width={60}
        height={50}
      />
      <div id="text" className={styles.text} aria-label="University of Sri Jayawardenepura">
        <h4>University Of Sri Jayawardenepura</h4>
        <h5>Learning Management System</h5>
      </div>
    </div>
  );
}
