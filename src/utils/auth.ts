import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { user } from "@/utils/backend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}, 
      },

      authorize: async (credentials) => {
        let currentUser = null; 
        const {email, password} = credentials as {email: string, password: string};

        // Executing sig  n in route of backend
        const response = await user.auth.signin({
          email,
          password
        });

        // Status of the response
        if (response.success) {
          // Successfull
          if (response.payload?.user) {
            // Sign in successfull
            const { user, token } = response.payload;
            currentUser = {
              id: user.id,
              name: user.full_name,
              email: user.email,
              profilePicture: user.profile_picture,
              courseId: user.course_id,
              accessToken: token,
            };
          }

        } else {
          // Sign in failed
          if (response.status == 401) {
            // Invalid credentials
            throw new Error("Error: Unmatching credentials !");
          } else if(response.status == 500) {
            // Server error
            throw new Error("ServerError: Sign in request failed due to a server error !");
          } else {
            // Unknown error
            console.log(response);
            throw new Error("UnknownError: Sign in request failed !");
          }
        }

        return currentUser;
      },
    }),
  ],
  callbacks: {
    authorized: async ({auth}) => {
      return !!auth;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session; 
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
});
