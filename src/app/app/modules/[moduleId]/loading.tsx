import Spinner from "@/components/spinner/view";
import styles from './page.module.css';

export default async function Loading() {
    return (
        <main className={styles.loadingPage}>
            <Spinner width={40} height={40} theme="dark" />
        </main>
    )
} 