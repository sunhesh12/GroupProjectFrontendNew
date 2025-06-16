import {user} from "@/utils/backend";

export default async function TestPage() {
    console.log(await user.auth.session());
  return (
    <main>
      <h1>Test Page</h1>
      <p>This is a test page.</p>
    </main>
  );
}