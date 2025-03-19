"use server";
import { updateUserSchema } from "@/utils/schema";
import { user } from "@/utils/backend"; // Import the backend API helper

export interface FormState {
  data: {
    id?: string;
    email?: string;
    full_name?: string;
    age?: string;
    address?: string;
    profile_picture?: string;
    password?: string;
    confirm_password?: string;
    status?: string;
    role?: string;
    course_id?: string;
    mobile_no?: string;
  };
  errors?:{
    email?: string[] | undefined;
    full_name?: string[] | undefined;
    age?: string[] | undefined;
    address?: string[] | undefined;
    profile_pic?: string[] | undefined;
    password?: string[] | undefined;
    confirm_password?: string[] | undefined;
    status?: string[] | undefined;
    role?: string[] | undefined;
    mobile_no?: string[] | undefined;
    course_id?: string[] | undefined;
  };
  serverError?: string;
}

export default async function createUser(
  initialData: FormState,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(
    formData.entries().map(([key, value]) => {
      return key === "age" ? [key, Number(value)] : [key, value];
    })
  ) as FormState["data"];

  const parsedForm = await updateUserSchema.safeParseAsync(rawFormData);

  if (!parsedForm.success) {
    return {
      data: rawFormData,
      errors: parsedForm.error.flatten().fieldErrors, // Return validation errors
    };
  }

  try {
    console.log(rawFormData);
    // Send update request to the backend
    const response = await user.create(rawFormData);
    console.log(response);

    if (!response.success) {
      return {
        data: rawFormData,
        serverError: "Failed to update the user"
      };
    }

    return {
      data: {
        id: response.payload?.id,
        email: response.payload?.email,
        full_name: response.payload?.full_name,
        age: response.payload?.age,
        address: response.payload?.address,
        profile_picture: response.payload?.profile_picture,
        password: response.payload?.password,
        confirm_password: response.payload?.password,
        status: response.payload?.status,
        role: response.payload?.role,
        mobile_no: response.payload?.mobile_no,
        course_id: response.payload?.course_id,
      }, // Return updated user data
    };
  } catch (error) {
    return {
      data: rawFormData,
      serverError: "Network error. Please try again later."
    };
  }
}
