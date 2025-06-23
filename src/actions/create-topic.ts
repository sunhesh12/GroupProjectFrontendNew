"use server";

import { TopicCreateState } from "./types";
import { topicCreateSchema } from "@/utils/schema";
import { modules } from "@/utils/backend";

export async function createTopic(
  previousState: TopicCreateState,
  formData: FormData
): Promise<TopicCreateState> {
  const rawFormData = Object.fromEntries(
    formData.entries().map(([key, value]) => [key, value])
  );

  const parsedForm = await topicCreateSchema.safeParseAsync(rawFormData);

  // Error while parsing 
  if(!parsedForm.success) {
    return {
        status: "failiure",
        internalErrors: ["Coludn't create the topic due to invalid values"],
        id: {
          value: previousState.id.value,
          errors: parsedForm.error.formErrors.fieldErrors.id as string[]
        },
        type: {
          value: previousState.type.value,
          errors: parsedForm.error.formErrors.fieldErrors.type as string[]
        },
        description: {
          value: previousState.title.value,
          errors: parsedForm.error.formErrors.fieldErrors.type as string[]
        },
        title: {
          value: previousState.title.value,
          errors: parsedForm.error.formErrors.fieldErrors.title as string[]
        },
        deadline: {
          value: previousState.deadline?.value || "",
          errors: parsedForm.error.formErrors.fieldErrors.deadline as string[]
      }
    };
  }

  try {
    const topicCreateResponse = await modules.createTopic(parsedForm.data.id, parsedForm.data);

    if(topicCreateResponse.status !== 201) {
      return {
        status: "failiure",
        internalErrors: topicCreateResponse.errors || ["Coludn't create the topic due to server error"],
        id: {
          value: previousState.id.value,
          errors: []
        },
        type: {
          value: previousState.type.value,
          errors: []
        },
        description: {
          value: previousState.description.value,
          errors: []
        },
        title: {
          value: previousState.title.value,
          errors: []
        },
        deadline: {
          value: previousState.deadline?.value || "",
          errors: []
        }
      };
    }

    return {
      status: "success",
      internalErrors: null,
      id: {
        value: parsedForm.data.id,
        errors: []
      },
      type: {
        value: parsedForm.data.type,
        errors: []
      },
      description: {
        value: parsedForm.data.description,
        errors: []
      },
      title: {
        value: parsedForm.data.title,
        errors: []
      },
      deadline: {
        value: parsedForm.data.deadline || "",
        errors: []
      }
    }

  } catch (error) {
    console.error("Error creating topic:", error);
    return {
      status: "failiure",
      internalErrors: ["Coludn't create the topic due to server error"],
      id: {
        value: previousState.id.value,
        errors: []
      },
      type: {
        value: previousState.type.value,
        errors: []
      },
      description: {
        value: previousState.description.value,
        errors: []
      },
      title: {
        value: previousState.title.value,
        errors: []
      },
      deadline: {
        value: previousState.deadline?.value || "",
        errors: []
      }
    };
  }

}
