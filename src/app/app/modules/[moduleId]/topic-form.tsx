"use client";
import { useEffect, useState } from "react";
import createTopicAction from "@/actions/create-topic";
import { useActionState } from "react";
import InputField from "@/components/input/view";
import Button from "@/components/buttons/view";
import Message from "@/components/message/view";
import type { TopicCreateState } from "@/actions/types";
import Spinner from "@/components/spinner/view";
import { Topic } from "@/utils/types/backend";

type TopicType = "assignment" | "lecture" | "lab";

const initialState: TopicCreateState = {
  status: "pending",
  internalErrors: null,
  id: {
    value: "",
    errors: null,
  },
  type: {
    value: "lecture",
    errors: null,
  },
  description: {
    value: "",
    errors: null,
  },
  title: {
    value: "",
    errors: null,
  },
  deadline: {
    value: new Date().toISOString(),
    errors: null,
  },
  is_visible: {
    value: "true",
    errors: null,
  },
};

interface TopicFormProps {
  moduleId: string;
  topicUpdate: (action: Topic) => void;
}

export default function TopicForm({ moduleId, topicUpdate }: TopicFormProps) {
  const [state, formAction, isPending] = useActionState(
    createTopicAction.bind(null, moduleId),
    initialState
  );
  const [selection, setSelection] = useState<TopicType>("lecture");

  useEffect(() => {
    if(state.status === "success" && state.id.value) {
      const newTopic: Topic = {
        id: crypto.randomUUID(),
        module_id: moduleId,
        title: state.title.value || "",
        description: state.description.value || "",
        type: state.type.value || "lecture",
        is_visible: state.is_visible.value === "true" ? "true" : "false",
        is_complete: "false",
        deadline: state.deadline?.value || null,
      };
      topicUpdate(newTopic);
    }
  }, [state]);

  return (
    <form action={formAction}>
      {state.status === "success" && (
        <Message type="success" message="Form submitted successfully" />
      )}
      {state.status === "failiure" && (
        <Message
          type="error"
          message={
            state.internalErrors?.reduce((acc, curr) => acc + curr + ",") ||
            "Form couldnt submit due to an unknown error"
          }
        />
      )}
      <InputField
        name="type"
        type="select"
        defaultValue={state.type.value ?? "lecture"}
        error={state.type.errors?.reduce((acc, curr) => {
          return acc + curr + " ";
        }, "")}
        options={[
          { value: "lecture", label: "Lecture" },
          { value: "assignment", label: "Assignment" },
          { value: "lab", label: "Lab" },
        ]}
        onChange={(e) => setSelection(e.target.value as TopicType)} // Handle type change
      />
      <InputField
        type="text"
        name="title"
        error={state.title.errors?.reduce((acc, curr) => {
          return acc + curr + " ";
        }, "")}
        label={`${
          selection[0].toUpperCase().concat(selection.substring(1)) ?? "Lecture"
        } Title`}
      />
      {selection === "assignment" && (
        <InputField
          type="date"
          name="deadline"
          error={state.deadline?.errors?.reduce((acc, curr) => {
            return acc + curr + " ";
          }, "")}
          label="Assignment Deadline"
        />
      )}
      <InputField
        type="textarea"
        name="description"
        error={state.description.errors?.reduce((acc, curr) => {
          return acc + curr + " ";
        }, "")}
        label={`${
          selection[0].toUpperCase().concat(selection.substring(1)) ?? "Lecture"
        } Description`}
      />
      <InputField
        type="checkbox"
        name="is_visible"
        label="Is this topic visible to students?"
        defaultChecked={true}
      />
      <div id="form-controls">
        <Button type="submit">
          {isPending && <Spinner theme="light" width={15} height={15} />} Add
          topic
        </Button>
      </div>
    </form>
  );
}
