"use client";

import Image from "next/image";
import styles from "./sigin.module.css";
import Button from "@/components/buttons/view";
import InputField from "@/components/input/view";
import signInAction from "@/utils/forms/signin/action";
import type { FormState } from "@/utils/forms/signin/types";
import { useActionState, useEffect } from "react";
import Message from "@/components/message/view";
import { signIn } from "next-auth/react";

const initialState: FormState = {
  email: {
    value: "",
    error: null,
  },
  password: {
    value: "",
    error: null,
  },
  state: "pending",
  message: "",
};

export default function SignInForm() {
  const [{ email, password, state, message }, formAction, pending] =
    useActionState(signInAction, initialState);
  const LoginIcon = "/logo.jpg";

  // Redirecting the user to a new page
  useEffect(() => {
    console.log("State changed:", state);
    if (state === "success") {
        signIn("credentials", {
          email: email.value,
          password: password.value,
        });
    }
  }, [state]);

  return (
    <div className={styles.page}>
      <form className={styles.signInForm} action={formAction}>
        <header className={styles.formHeader}>
          <Image src={LoginIcon} alt="LMS Logo" width={80} height={80} />
          <h1>Sign in</h1>
          {state === "success" && <Message type="success" message={message} />}
          {state === "error" && <Message type="error" message={message} />}
        </header>
        <InputField
          type="text"
          name="email"
          label="Email"
          error={email.error}
          placeholder="someone@something.com"
          defaultValue={email.value}
        />
        <InputField
          error={password.error}
          type="password"
          name="password"
          label="Password"
          defaultValue={password.value}
        />
        <Button isLoading={pending} type="submit" className={styles.button}>
          Sign in
        </Button>
      </form>
    </div>
  );
}
