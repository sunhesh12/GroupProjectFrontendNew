import Spinner from "@/components/spinner/view";
import styles from "./loading.module.css";

export default function ManageLoading() {
    return (
        <div className={styles.main}>
            <Spinner theme="dark" width={50} height={50} /> 
        </div>
    )
}