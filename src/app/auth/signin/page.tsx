import SignInForm from "./sign-in-form";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/get-session";

export default async function SignIn() {
  const session = await getSession();

  if(session) {
    redirect("/app/dashboard");
  }

  return (
    <SignInForm />
  );
}
