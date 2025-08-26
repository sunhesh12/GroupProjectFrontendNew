"use server";

import { TopicCreateState } from "./types";
import { topicCreateSchema } from "@/utils/schema";
import { modules } from "@/utils/backend";
import { getSession } from "@/actions/get-session";

export async function createTopicAction(
  moduleId: string,
  previousState: TopicCreateState,
  formData: FormData
): Promise<TopicCreateState> {
  const session = await getSession();

  // user is unauthenticated
  if (!session) {
    return {
      status: "failiure",
      internalErrors: ["User is not authenticated"],
      id: {
        value: "",
        errors: ["User is not authenticated"],
      },
      type: {
        value: "",
        errors: [],
      },
      description: {
        value: "",
        errors: [],
      },
      title: {
        value: "",
        errors: [],
      },
      deadline: {
        value: "",
        errors: [],
      },
      is_visible: {
        value: "",
        errors: [],
      },
    };
  }

  const rawFormData = Object.fromEntries(
    formData
      .entries()
      .map(([key, value]) =>
        key === "is_visible"
          ? [key, value === "true" ? true : false]
          : key === "deadline" ? [key, new Date(value.toString()).toISOString()] : [key, value] 
      )
  );
  rawFormData.id = session.id.toString();

  const parsedForm = await topicCreateSchema.safeParseAsync(rawFormData);

  // Error while parsing
  if (!parsedForm.success) {
    return {
      status: "failiure",
      internalErrors: ["Coludn't create the topic due to invalid values"],
      id: {
        value: rawFormData.id ? rawFormData.id.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.id as string[],
      },
      type: {
        value: rawFormData.type ? rawFormData.type.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.type as string[],
      },
      description: {
        value: rawFormData.description
          ? rawFormData.description.toString()
          : "",
        errors: parsedForm.error.formErrors.fieldErrors.description as string[],
      },
      title: {
        value: rawFormData.title ? rawFormData.title.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.title as string[],
      },
      deadline: {
        value: rawFormData.deadline ? rawFormData.deadline.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.deadline as string[],
      },
      is_visible: {
        value: rawFormData.is_visible ? rawFormData.is_visible.toString() : "",
        errors: parsedForm.error.formErrors.fieldErrors.is_visible as string[],
      },
    };
  }

  try {
    const topicCreateResponse = await modules.createTopic(
      moduleId,
      parsedForm.data
    );
    console.log("Topic create response:", topicCreateResponse);

    if (!topicCreateResponse.success) {
      return {
        status: "failiure",
        internalErrors: ["Coludn't create the topic due to server error"],
        id: {
          value: rawFormData.id ? rawFormData.id.toString() : "",
          errors: [],
        },
        type: {
          value: rawFormData.type ? rawFormData.type.toString() : "",
          errors: [],
        },
        description: {
          value: rawFormData.description
            ? rawFormData.description.toString()
            : "",
          errors: [],
        },
        title: {
          value: rawFormData.title ? rawFormData.title.toString() : "",
          errors: [],
        },
        deadline: {
          value: rawFormData.deadline ? rawFormData.deadline.toString() : "",
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
      internalErrors: ["Topic created successfully"],
      id: {
        value: rawFormData.id ? rawFormData.id.toString() : "",
        errors: [],
      },
      type: {
        value: rawFormData.type ? rawFormData.type.toString() : "",
        errors: [],
      },
      description: {
        value: rawFormData.description
          ? rawFormData.description.toString()
          : "",
        errors: [],
      },
      title: {
        value: rawFormData.title ? rawFormData.title.toString() : "",
        errors: [],
      },
      deadline: {
        value: rawFormData.deadline ? rawFormData.deadline.toString() : "",
        errors: [],
      },
      is_visible: {
        value: rawFormData.is_visible ? rawFormData.is_visible.toString() : "",
        errors: [],
      },
    };
  } catch (error) {
    console.error("Error creating topic:", error);
    return {
      status: "failiure",
      internalErrors: ["Coludn't create the topic due to server error"],
      id: {
        value: rawFormData.id ? rawFormData.id.toString() : "",
        errors: [],
      },
      type: {
        value: rawFormData.type ? rawFormData.type.toString() : "",
        errors: [],
      },
      description: {
        value: rawFormData.description
          ? rawFormData.description.toString()
          : "",
        errors: [],
      },
      title: {
        value: rawFormData.title ? rawFormData.title.toString() : "",
        errors: [],
      },
      deadline: {
        value: rawFormData.deadline ? rawFormData.deadline.toString() : "",
        errors: [],
      },
      is_visible: {
        value: rawFormData.is_visible ? rawFormData.is_visible.toString() : "",
        errors: [],
      },
    };
  }
}
