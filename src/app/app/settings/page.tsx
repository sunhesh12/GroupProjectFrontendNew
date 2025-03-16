import styles from "./page.module.css";
import ProfilePic from "@/components/profile-pic/view";
import Button from "@/components/buttons/view";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className={styles.profilePage}>
      <header id="top" className={styles.top}>
		<Image src="/courseCart.jpeg" width={400} height={200} alt="Cover image" />   
      </header>
    </div>
  )
}
