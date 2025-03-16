import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email().nonempty(),
    full_name: z.string().nonempty(),
    age: z.number().int().min(16).max(100).nonnegative(),
    mobile_no: z.string().nonempty(),
    address: z.string().nonempty(),
    course_id: z.string().nonempty(),
    password: z.string().nonempty(),
    confirm_password: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const signInSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
