import Image from "next/image";
import styles from "./sigin.module.css";
import Button from "@/components/buttons/view";
import InputField from "@/components/input/view";
import signInAction from "@/actions/signin";

export default function SignIn() {
  const LoginIcon = "/logo.jpg";

  return (
    <div className={styles.page}>
      <form className={styles.signInForm} action={signInAction}>
        <header className={styles.formHeader}>
          <Image src={LoginIcon} alt="LMS Logo" width={80} height={80} />
          <h1>Sign in</h1>
        </header>
        <InputField
          type="text"
          name="email"
          label="Email"
          placeholder="someone@something.com"
        />
        <InputField type="password" name="password" label="Password" />
        <Button type="submit" className={styles.button}>
          Sign in
        </Button>
      </form>
    </div>
  );
}
