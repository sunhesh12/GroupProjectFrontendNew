"use server";

import { MaterialCreateState } from "./types";
import { materialCreateSchema } from "@/utils/schema";
import { topics } from "@/utils/backend";
import { getSession } from "@/utils/auth";
import { MaterialTypes } from "@/utils/types/backend";

export async function createMaterialAction(
  topicId: string,
  previousState: MaterialCreateState,
  formData: FormData
): Promise<MaterialCreateState> {
  const session = await getSession();

  if (!session) {
    return {
      status: "failiure",
      internalErrors: ["User is not authenticated"],
      material_type: {
        value: "unknown",
        errors: [],
      },
      material_title: {
        value: "",
        errors: [],
      },
      material_url: {
        value: "",
        errors: [],
      },
    };
  }

  const rawFormData = Object.fromEntries(
    formData.entries()
  );

  rawFormData.topic_id = topicId;

  const parsedForm = await materialCreateSchema.safeParseAsync(rawFormData);

  if (!parsedForm.success) {
    return {
      status: "failiure",
      internalErrors: ["Couldn't create material due to invalid values"],
      material_type: {
        value: (rawFormData.material_type?.toString() ?? "") as MaterialTypes,
        errors: parsedForm.error.formErrors.fieldErrors.material_type as string[] ?? [],
      },
      material_title: {
        value: rawFormData.material_title?.toString() ?? "",
        errors: parsedForm.error.formErrors.fieldErrors.material_title as string[] ?? [],
      },
      material_url: {
        value: rawFormData.material_url?.toString() ?? "",
        errors: parsedForm.error.formErrors.fieldErrors.material_url as string[] ?? [],
      },
    };
  }

  try {
    const response = await topics.addMaterial(
      topicId,
      parsedForm.data
    );

    if (!response.success) {
      return {
        status: "failiure",
        internalErrors: ["Server error while creating material"],
        material_type: {
          value: parsedForm.data.material_type,
          errors: [],
        },
        material_title: {
          value: parsedForm.data.material_title,
          errors: [],
        },
        material_url: {
          value: parsedForm.data.material_url ?? "",
          errors: [],
        },
      };
    }

    return {
      status: "success",
      internalErrors: [],
      material_type: {
        value: parsedForm.data.material_type,
        errors: [],
      },
      material_title: {
        value: parsedForm.data.material_title,
        errors: [],
      },
      material_url: {
        value: parsedForm.data.material_url ?? "",
        errors: [],
      },
    };
  } catch (error) {
    console.error("Error submitting material:", error);
    return {
      status: "failiure",
      internalErrors: ["Unexpected server error occurred"],
      material_type: {
        value: (rawFormData.material_type?.toString() ?? "") as MaterialTypes,
        errors: [],
      },
      material_title: {
        value: rawFormData.material_title?.toString() ?? "",
        errors: [],
      },
      material_url: {
        value: rawFormData.material_url?.toString() ?? "",
        errors: [],
      },
    };
  }
}
