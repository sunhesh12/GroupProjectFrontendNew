"use client";

import Image from "next/image";
import styles from "./sigin.module.css";
import Button from "@/components/buttons/view";
import InputField from "@/components/input/view";
import signInAction from "@/actions/signin";
import type { SignInState } from "@/actions/types";
import { useActionState } from "react";
import Message from "@/components/message/view";

const initialState: SignInState = {
  status: "pending",
  internalErrors: null,
  email: {
    value: "",
    errors: null
  },
  password: {
    value: "",
    errors: null
  },
}

export default function SignInForm() {
    const [values, formAction, isPending] = useActionState(signInAction, initialState);
  const LoginIcon = "/logo.jpg";

  return (
    <div className={styles.page}>
      <form className={styles.signInForm} action={formAction}>
        <header className={styles.formHeader}>
          <Image src={LoginIcon} alt="LMS Logo" width={80} height={80} />
          <h1>Sign in</h1>
          {values.status === "success" && <Message type="success" message="Form submitted successfully" />}
          {values.status === "failiure" && <Message type="error" message={values.internalErrors?.reduce((acc, curr) => acc + curr + ",") || "Form couldnt submit due to an unknown error"} />}
        </header>
        <InputField
          type="text"
          name="email"
          label="Email"
          error={values.email.errors?.reduce((acc, curr) => {
            return acc + curr + ",";
          }, "")}
          placeholder="someone@something.com"
          defaultValue={values.email.value}
        />
        <InputField
          error={values.email.errors?.reduce((acc, curr) => {
            return acc + curr + " ";
          }, "")}
          type="password"
          name="password"
          label="Password"
          defaultValue={values.password.value}
        />
        <Button isLoading={isPending} type="submit" className={styles.button}>
          Sign in
        </Button>
      </form>
    </div>
  );
}
