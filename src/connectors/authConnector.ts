// utils/authConnector.ts
import Cookies from "js-cookie";

export interface User {
  username: string;
  password: string;
  role: string;
}

export function authenticateUser(
  loginDB: User[],
  username: string,
  password: string
): { success: boolean; user?: User; error?: string } {
  const user = loginDB.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Set cookies for user session
    Cookies.set("username", user.username, { expires: 7 });
    Cookies.set("role", user.role, { expires: 7 });
    return { success: true, user };
  }

  return { success: false, error: "Invalid username or password." };
}
