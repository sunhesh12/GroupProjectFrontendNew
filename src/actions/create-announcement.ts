"use server";

import { AnnouncementCreateState } from "./types";
import { announcementCreateSchema } from "@/utils/schema";
import { modules } from "@/utils/backend";
import { getSession } from "@/actions/get-session";

export default async function createAnnouncementAction(
  moduleId: string,
  previousState: AnnouncementCreateState,
  formData: FormData
): Promise<AnnouncementCreateState> {
  const session = await getSession();

  // user is unauthenticated
  if (!session) {
    return {
      status: "failure",
      internalErrors: ["User is not authenticated"],
      topic: {
        value: "",
        errors: ["User is not authenticated"],
      },
      description: {
        value: "",
        errors: [],
      },
      is_visible: {
        value: "",
        errors: [],
      },
    };
  }

  // Convert form data into object
  const rawFormData = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => {
    if (key === "is_visible") {
      return [key, value === "true"];
    }  else {
      return [key, value];
    }
  })
  );

  // Attach user id
  rawFormData.userId = session.id.toString();

  // Validate with Zod schema
  const parsedForm = await announcementCreateSchema.safeParseAsync(rawFormData);

  if (!parsedForm.success) {
    return {
      status: "failure",
      internalErrors: [
        "Couldn't create the announcement due to invalid values",
      ],
      topic: {
        value: rawFormData.topic ? rawFormData.topic.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.topic as string[],
      },
      description: {
        value: rawFormData.description
          ? rawFormData.description.toString()
          : "",
        errors: parsedForm.error.formErrors.fieldErrors.description as string[],
      },
      is_visible: {
        value: rawFormData.is_visible ? rawFormData.is_visible.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.is_visible as string[],
      },
    };
  }

  console.log("Parsed form data:", parsedForm.data);

  try {
    const announcementResponse = await modules.createAnnouncement(
      moduleId,
      parsedForm.data
    );

    if (!announcementResponse.success) {
      return {
        status: "failure",
        internalErrors: [
          "Couldn't create the announcement due to server error",
        ],
        topic: {
          value: rawFormData.topic ? rawFormData.topic.toString() : "",
          errors: [],
        },
        description: {
          value: rawFormData.description
            ? rawFormData.description.toString()
            : "",
          errors: [],
        },
        is_visible: {
          value: rawFormData.is_visible
            ? rawFormData.is_visible.toString()
            : "",
          errors: [],
        },
      };
    }

    return {
      status: "success",
      internalErrors: ["Announcement created successfully"],
      topic: {
        value: rawFormData.topic ? rawFormData.topic.toString() : "",
        errors: [],
      },
      description: {
        value: rawFormData.description
          ? rawFormData.description.toString()
          : "",
        errors: [],
      },
      is_visible: {
        value: rawFormData.is_visible ? rawFormData.is_visible.toString() : "",
        errors: [],
      },
    };
  } catch (error) {
    console.error("Error creating announcement:", error);
    return {
      status: "failure",
      internalErrors: ["Couldn't create the announcement due to server error"],
      topic: {
        value: rawFormData.topic ? rawFormData.topic.toString() : "",
        errors: [],
      },
      description: {
        value: rawFormData.description
          ? rawFormData.description.toString()
          : "",
        errors: [],
      },
      is_visible: {
        value: rawFormData.is_visible ? rawFormData.is_visible.toString() : "",
        errors: [],
      },
    };
  }
}
