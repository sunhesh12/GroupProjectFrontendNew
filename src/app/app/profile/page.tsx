import ProfilePic from "@/components/profile-pic/view";
import styles from "./page.module.css";
import Button from "@/components/buttons/view";
import InputField from "@/components/input/view";

export default function SettingsPage() {
  return (
    <div className={styles.profilePage}>
      <header className={styles.header}>
        <h1>Your profile</h1>
      </header>
      <form id="settingsForm" className={styles.settingsForm}>
        <header id="formHeader" className={styles.formHeader}>
          <article id="profileInfo" className={styles.profileInfo}>
            <section id="left">
              <ProfilePic
                src="/profile-pic.jpg"
                alt="Profile picture"
                width={100}
              />
            </section>
            <section id="right" className={styles.profileRight}>
              <div className={styles.nameAndEmail}>
                <h2 className={styles.name}>Polina Smirnowa</h2>
                <p className={styles.role}>Student</p>
              </div>
              <p className={styles.role}>Department of Software Engineering</p>
            </section>
          </article>
          <Button fontSize="15px" className={styles.editButton}>
            Edit profile
          </Button>
        </header>
        <div className={styles.line}></div>
        <section id="formContent" className={styles.formContent}>
          <div>
            <h2>Basic Info</h2>
            <div className={styles.inputContainer}>
              <InputField type="text" label="Full Name" name="fullName" />
              <InputField type="text" label="Email" name="email" />
              <InputField type="text" label="Mobile" name="mobile" />
              <InputField type="text" label="Address" name="address" />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
