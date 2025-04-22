import {z} from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
});
