import dynamic from "next/dynamic";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

// Load client only (it uses hooks & window)
const MessagesClient = dynamic(() => import("../../../components/messageConvo/message"));

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) redirect("/auth/signin");

  return <MessagesClient userId={session.id} token={session.token} />;
}
