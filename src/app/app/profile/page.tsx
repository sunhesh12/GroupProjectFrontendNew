import ProfilePic from "@/components/profile-pic/view";
import styles from "./page.module.css";
import Button from "@/components/buttons/view";
import InputField from "@/components/input/view";
import { user } from "@/utils/backend";
import { auth } from "@/utils/auth";

export default async function SettingsPage() {
  const session = await auth();

  if (!session || !session.user) {
    // redirect or return fallback
    return <p>You are not logged in.</p>;
  }

  const currentUser = await user.get(session.user.id);

  if (!currentUser?.payload) {
    return <p>User data not available</p>;
  }

  const payload = currentUser.payload;

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
                src={payload.profile_picture ?? "/kirula.png"}
                alt="Profile picture"
                width={100}
              />
            </section>
            <section id="right" className={styles.profileRight}>
              <div className={styles.nameAndEmail}>
                <h2 className={styles.name}>{payload.full_name ?? "User"}</h2>
                <p className={styles.role}>{payload.role ?? "Role"}</p>
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
              <InputField
                type="text"
                label="Full Name"
                name="fullName"
                placeholder={payload.full_name ?? ""}
              />
              <InputField
                type="text"
                label="Email"
                name="email"
                placeholder={payload.email ?? ""}
              />
              <InputField
                type="text"
                label="Mobile"
                name="mobile"
                placeholder={payload.mobile_no ?? ""}
              />
              <InputField
                type="text"
                label="Address"
                name="address"
                placeholder={payload.address ?? ""}
              />
              <InputField
                type="text"
                label="Age"
                name="age"
                placeholder={payload.age ?? ""}
              />
              <InputField
                type="text"
                label="Change Password"
                name="password"
                placeholder="Enter new password"
              />
            </div>
          </div>
          <br></br>
          <div className={styles.buttonContainer}>
            <div>
              <input type="checkbox" id="emailNotifications" />
              <label htmlFor="emailNotifications">Email Notifications</label>
            </div>
            <div>
              <input type="checkbox" id="smsNotifications" />
              <label htmlFor="pushNotifications">Push Notifications</label>
            </div>
            <div>
              <input type="checkbox" id="emailNotifications" />
              <label htmlFor="smsNotifications">SMS Notifications</label>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
