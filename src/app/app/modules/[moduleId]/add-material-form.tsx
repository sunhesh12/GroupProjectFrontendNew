"use client";
import { createMaterialAction } from "@/actions/create-material";
import { useActionState } from "react";
import InputField from "@/components/input/view";
import Button from "@/components/buttons/view";
import Message from "@/components/message/view";
import type { MaterialCreateState } from "@/actions/types";

const initialState: MaterialCreateState = {
  status: "pending",
  internalErrors: null,
  material_type: {
    value: "document",
    errors: null, 
  },
  material_title: {
    value: "",
    errors: null,
  },
  material_url: {
    value: "",
    errors: null,
  },
};

interface MaterialFormProps {
  topicId: string;
}

export default function MaterialForm({ topicId }: MaterialFormProps) {
  const [state, formAction, isPending] = useActionState(
    createMaterialAction.bind(null, topicId),
    initialState
  );
  //const [typeSelection, setTypeSelection] = useState("document");

  return (
    <form action={formAction}>
      {state.status === "success" && (
        <Message type="success" message="Material submitted successfully" />
      )}
      {state.status === "failiure" && (
        <Message
          type="error"
          message={
            state.internalErrors?.join(", ") ||
            "Submission failed due to an unknown error."
          }
        />
      )}

      <InputField
        name="material_type"
        type="select"
        defaultValue={state.material_type.value ?? "document"}
        error={state.material_type.errors?.join(" ")}
        options={[
          { value: "document", label: "Document" },
          { value: "video", label: "Video" },
          { value: "audio", label: "Audio" },
          {value: "link", label: "Link" },
          { value: "executable", label: "Executable" },
            { value: "zip", label: "Zip" },
            { value: "image", label: "Image" },
            { value: "website", label: "Website" },
            { value: "unknown", label: "Unknown" },
            { value: "pdf", label: "PDF" },
        ]}
        //onChange={(e) => setTypeSelection(e.target.value)}
      />

      <InputField
        name="material_title"
        type="text"
        label="Material Title"
        error={state.material_title.errors?.join(" ")}
      />

      <InputField
        name="material_url"
        type="text"
        label="Material URL"
        error={state.material_url.errors?.join(" ")}
      />

      <div id="form-controls">
        <Button type="submit">
          Add Material
        </Button>
      </div>
    </form>
  );
}
