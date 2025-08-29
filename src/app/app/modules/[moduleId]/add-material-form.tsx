"use client";
import { createMaterialAction } from "@/actions/create-material";
import { useActionState } from "react";
import InputField from "@/components/input/view";
import Button from "@/components/buttons/view";
import Message from "@/components/message/view";
import type { MaterialCreateState } from "@/actions/types";
import Spinner from "@/components/spinner/view";

const initialState: MaterialCreateState = {
  status: "pending",
  internalErrors: null,
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
      {state.status === "failure" && (
        <Message
          type="error"
          message={
            state.internalErrors?.join(", ") ||
            "Submission failed due to an unknown error."
          }
        />
      )}
      <InputField name="file" type="file" label="Add your lecture material" />
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
          {isPending && <Spinner theme="light" width={15} height={15} />}
          Add Material
        </Button>
      </div>
    </form>
  );
}
