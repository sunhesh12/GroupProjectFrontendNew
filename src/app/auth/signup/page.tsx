import signup from "@/actions/signup";
import styles from "./page.module.css";
import InputField from "@/components/input/view";
import Button from "@/components/buttons/view";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export default function SignUpPage() {
  return (
    <main className={workSans.className + " " + styles.main}>
      <header>
        <h1 className={styles.heading}>Register as a student</h1>
        <p className={styles.caption}>
          Join Us Today – Your Learning Journey Starts Here!
        </p>
      </header>
      <form action={signup} className={styles.form}>
        <InputField
          type="email"
          label="Email"
          placeholder="someone@something.com"
          name="email"
          required={true}
        />
        <InputField
          type="text"
          label="Full name"
          name="full_name"
          placeholder="Rasuwan Kalhara"
          required={true}
        />
        <InputField type="password" label="Password" name="password" required={true} />
        <InputField
          type="password"
          label="Confirm Password"
          name="confirm_password"
          required={true}
        />
        <InputField type="number" min={18} max={100} label="Age" name="age" required={true} />
        <InputField
          type="tel"
          label="Mobile no"
          name="mobile_no"
          placeholder="eg: 0771234567"
          required={true}
        />
        <InputField type="text" label="Address" name="address" required={true} />
        <InputField
          type="select"
          name="course_id"
          label="Select your course"
          defaultValue="2"
          options={[
            { value: "1", label: "Software Engineering" },
            { value: "2", label: "Information Systems" },
            { value: "3", label: "Computer Science" },
          ]}
          required={true}
        />
        <hr className={styles.hr} />
        <div id="button-container" className={styles.buttonContainer}>
          <Button width="150px" type="submit">
            Sign up
          </Button>
          <Button width="150px" type="submit">
            Reset
          </Button>
        </div>
      </form>
    </main>
  );
}
