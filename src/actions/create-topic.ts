"use server";

import { TopicCreateState } from "./types";
import { topicCreateSchema } from "@/utils/schema";
import { assignments, modules } from "@/utils/backend";
import { getSession } from "@/actions/get-session";
import { start } from "repl";

export default async function createTopicAction(
  moduleId: string,
  previousState: TopicCreateState,
  formData: FormData
): Promise<TopicCreateState> {
  const session = await getSession();

  console.log("Form data", formData);

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

  // console.log("Form Data:", formData);

  // const rawFormData = Object.fromEntries(
  //   formData
  //     .entries()
  //     .map(([key, value]) =>
  //       key === "is_visible"
  //         ? [key, value === "true" ? true : false]
  //         : key === "deadline" ? [key, new Date(value.toString()).toISOString()] : [key, value] 
  //     )
  // );

//   const rawFormData = Object.fromEntries(
//   Array.from(formData.entries()).map(([key, value]) =>
//     key === "is_visible"
//       ? [key, value === "true"]
//       : key === "deadline"
//       ? [key, new Date(value.toString()).toISOString()]
//       : [key, value]
//   )
// );

const rawFormData = Object.fromEntries(
  Array.from(formData.entries()).map(([key, value]) => {
    if (key === "is_visible") {
      return [key, value === "true"];
    } else if (key === "deadline") {
      return [key, new Date(value.toString()).toISOString()];
    } else {
      return [key, value];
    }
  })
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

    if(parsedForm.data.type === "assignment") {
      const today = new Date();

      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const dd = String(today.getDate()).padStart(2, "0");

      const formattedToday = `${yyyy}-${mm}-${dd}`;


      const today2 = new Date(parsedForm.data.deadline ?? "");

      const yyyy2 = today2.getFullYear();
      const mm2 = String(today2.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const dd2 = String(today2.getDate()).padStart(2, "0");

      const formattedToday2 = `${yyyy2}-${mm2}-${dd2}`;

      console.log("Creating assignment for the topic");
      const assignmentCreateResponse = await assignments.create(moduleId, {
        activity_name: parsedForm.data.title,
        type: "assignment",
        description: parsedForm.data.description,
        start_date: formattedToday,
        end_date: formattedToday2,
      });

      console.log("Assignment create response:", assignmentCreateResponse);

      if (!assignmentCreateResponse.success) {
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
    }

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
