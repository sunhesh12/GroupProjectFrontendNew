import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email is required" }),
    full_name: z
      .string()
      .nonempty({ message: "Full name is required" }),
    age: z
      .number()
      .int({ message: "Age must be an integer" })
      .min(16, { message: "You must be at least 16 years old" })
      .max(100, { message: "Age cannot be more than 100 years" })
      .nonnegative({ message: "Age must be a positive number" }),
    mobile_no: z
      .string()
      .nonempty({ message: "Mobile number is required" }),
    address: z
      .string()
      .nonempty({ message: "Address is required" }),
    course_id: z
      .string()
      .nonempty({ message: "Course ID is required" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" }),
    confirm_password: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const updateUserSchema = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    full_name: z.string().min(1, { message: "Full name is required" }),
    age: z
      .number()
      .int({ message: "Age must be an integer" })
      .min(16, { message: "Minimum age is 16" })
      .max(100, { message: "Maximum age is 100" })
      .nonnegative({ message: "Age must be positive" }),
    mobile_no: z.string().min(1, { message: "Mobile number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    course_id: z.string().min(1, { message: "Course ID is required" }),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .refine(
    (data) => {
        return data.password === data.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" }),
});

export const announcementCreateSchema = z.object({
  userId: z.string(),
  topic: z.string().min(1, "Topic is required"),
  description: z.string().min(1, "Description is required"),
  is_visible: z.boolean(),
});


export const topicCreateSchema = z.object({
  id: z
    .string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.enum(["lecture", "assignment", "resource"], {
    message: "Type must be one of 'lecture', 'assignment', or 'resource'",
  }),
  deadline: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }), 
  is_visible: z.boolean(),
});

export const materialCreateSchema = z.object({
  material_type: z.enum(['video' , 'document' , 'link' , 'audio' , 'executable' , 'zip' , 'image' , 'website' , 'unknown' , 'error' , 'pdf']),
  material_title: z.string().min(1).max(255),
  material_url: z.string().url().optional().or(z.literal("")),
});
