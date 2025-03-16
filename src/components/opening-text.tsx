import styles from "@/styles/quote.module.css";
export default function OpeningText() {
  return (
	<div className={styles.textContaainer}>
          <div className={styles.intoHeading}>
            <h1>Welcome to Learning Management System</h1>
          </div>
          <div className={styles.introText}>
            <i>
              <p>
                Online learning is not the next big thing, it is the now big
                thing
                <span>~ Donna J. Abernathy</span>
              </p>
            </i>
          </div>
        </div>
  )
}
