import Image from "next/image";
import Button from "@/components/buttons/view";
import styles from "./style.module.css";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  subsets: ["latin"],
  weight: "400",
});

export default function Hero() {
  return (
    <article id="hero" className={styles.hero}>
      <Image
        id="image"
        className={styles.artworkLarge}
        src="/welcome.webp"
        alt="An image with online education items and pencils on float"
        height={400}
        width={400}
      />
      <h1 className={pangolin.className + " " + styles.mainCaption}>
        <span className={styles.a}>Organize. </span>
        <span className={styles.b}>Learn. </span>
        <span className={styles.c}>Create.</span>
      </h1>
      <p className={styles.subCaption}>
        Welcome to the learning management system of the <br />
        <span className={styles.uniname}>
          University of Sri Jayawardenepura.
        </span>
      </p>
      <section className={styles.nav}>
        <Button width="120px" isLink={true} href="/auth/signin">
          Sign in
        </Button>
        <Button width="120px" isLink={true} href="/auth/signup">Join LMS</Button>
      </section>
    </article>
  );
}
