
// Styles
import styles from "@/app/page.module.css";

// Fonts
import Hero from "@/components/hero/view";


export default function HomePage() {
  return (
    <>
      <div className={styles.heroContainer}>
        <Hero />
      </div>
    </>
  );
}
