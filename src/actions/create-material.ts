"use server";

import { MaterialCreateState } from "./types";
import { materialCreateSchema } from "@/utils/schema";
import { topics } from "@/utils/backend";
import { getSession } from "@/actions/get-session";

export async function createMaterialAction(
  topicId: string,
  previousState: MaterialCreateState,
  formData: FormData
): Promise<MaterialCreateState> {
  const session = await getSession();

  if (!session) {
    return {
      status: "failure",
      internalErrors: ["User is not authenticated"],
      material_title: { value: "", errors: [] },
      material_url: { value: "", errors: [] },
    };
  }

  // 🔹 If file is uploaded, skip JSON parsing and send FormData directly
  const hasFile = formData.get("file") instanceof File;

  if (hasFile) {
    try {
      const response = await topics.uploadMaterial(topicId, formData);
          console.log("Material create response:", response);


      if (!response.success) {
        return {
          status: "failure",
          internalErrors: ["Server error while uploading file"],
          material_title: { value: formData.get("material_title")?.toString() ?? "", errors: [] },
          material_url: { value: "", errors: [] },
        };
      }

      return {
        status: "success",
        internalErrors: [],
        material_title: { value: formData.get("material_title")?.toString() ?? "", errors: [] },
        material_url: { value: "", errors: [] },
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      return {
        status: "failure",
        internalErrors: ["Unexpected server error occurred"],
        material_title: { value: formData.get("material_title")?.toString() ?? "", errors: [] },
        material_url: { value: "", errors: [] },
      };
    }
  }

  // 🔹 Otherwise treat as link material
  const rawFormData = Object.fromEntries(formData.entries());
  rawFormData.topic_id = topicId;

  const parsedForm = await materialCreateSchema.safeParseAsync(rawFormData);

  if (!parsedForm.success) {
    return {
      status: "failure",
      internalErrors: ["Couldn't create material due to invalid values"],
      material_title: {
        value: rawFormData.material_title?.toString() ?? "",
        errors: (parsedForm.error.formErrors.fieldErrors.material_title as string[]) ?? [],
      },
      material_url: {
        value: rawFormData.material_url?.toString() ?? "",
        errors: (parsedForm.error.formErrors.fieldErrors.material_url as string[]) ?? [],
      },
    };
  }

  try {
    const response = await topics.addMaterial(topicId, parsedForm.data);
    console.log("Material create response:", response);

    if (!response.success) {
      return {
        status: "failure",
        internalErrors: ["Server error while creating material"],
        material_title: { value: parsedForm.data.material_title, errors: [] },
        material_url: { value: parsedForm.data.material_url ?? "", errors: [] },
      };
    }

    return {
      status: "success",
      internalErrors: [],
      material_title: { value: parsedForm.data.material_title, errors: [] },
      material_url: { value: parsedForm.data.material_url ?? "", errors: [] },
    };
  } catch (error) {
    console.error("Error submitting material:", error);
    return {
      status: "failure",
      internalErrors: ["Unexpected server error occurred"],
      material_title: { value: rawFormData.material_title?.toString() ?? "", errors: [] },
      material_url: { value: rawFormData.material_url?.toString() ?? "", errors: [] },
    };
  }
}
