import { redirect } from "next/navigation";
import SignInForm from "./sign-in-form";
import { auth } from "@/utils/auth";

export default async function SignIn() {
  const session = await auth();
  
  if(session) {
    redirect("/app/dashboard");
  }

  return (
    <SignInForm />
  );
}
