"use server";

import { getSession } from "@/actions/get-session";
import { assignments } from "@/utils/backend";
import { z } from "zod";

const assignmentSubmissionSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  submission: z.string().optional(),
  file: z.any().optional(), // file handled separately
});

export type AssignmentSubmissionState = {
  status: "success" | "failure";
  internalErrors: string[];
  submission: {
    value: string;
    errors: string[];
  };
  file: {
    value: string;
    errors: string[];
  };
};

export default async function submitAssignmentAction(
  activityId: string,
  previousState: AssignmentSubmissionState,
  formData: FormData
): Promise<AssignmentSubmissionState> {
  const session = await getSession();

  if (!session) {
    return {
      status: "failure",
      internalErrors: ["User is not authenticated"],
      submission: { value: "", errors: ["User is not authenticated"] },
      file: { value: "", errors: [] },
    };
  }

  // Attach user_id to FormData
  formData.append("user_id", session.id.toString());

  // Validate text parts with Zod
  const rawFormData = Object.fromEntries(formData.entries());
  const parsedForm = await assignmentSubmissionSchema.safeParseAsync(rawFormData);

  if (!parsedForm.success) {
    return {
      status: "failure",
      internalErrors: ["Invalid submission values"],
      submission: {
        value: rawFormData.submission ? rawFormData.submission.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.submission as string[],
      },
      file: {
        value: rawFormData.file ? rawFormData.file.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.file as string[],
      },
    };
  }

  try {
    const submissionResponse = await assignments.submit(activityId, formData);

    if (!submissionResponse.success) {
      return {
        status: "failure",
        internalErrors: ["Couldn't submit the assignment due to server error"],
        submission: { value: rawFormData.submission?.toString() ?? "", errors: [] },
        file: { value: rawFormData.file?.toString() ?? "", errors: [] },
      };
    }

    return {
      status: "success",
      internalErrors: ["Submission recorded successfully"],
      submission: { value: rawFormData.submission?.toString() ?? "", errors: [] },
      file: { value: rawFormData.file?.toString() ?? "", errors: [] },
    };
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return {
      status: "failure",
      internalErrors: ["Couldn't submit the assignment due to server error"],
      submission: { value: rawFormData.submission?.toString() ?? "", errors: [] },
      file: { value: rawFormData.file?.toString() ?? "", errors: [] },
    };
  }
}