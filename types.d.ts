declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    profilePicture: string | null;
  }

  interface Session {
    user: User;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT as DefaultJWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: User;
  }
}

