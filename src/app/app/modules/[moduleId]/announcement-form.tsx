"use client";
import { useEffect } from "react";
import { useActionState } from "react";
import InputField from "@/components/input/view";
import Button from "@/components/buttons/view";
import Message from "@/components/message/view";
import Spinner from "@/components/spinner/view";
import { Announcement, Topic } from "@/utils/types/backend";
import createAnnouncementAction from "@/actions/create-announcement";
import { AnnouncementCreateState } from "@/actions/types";

const initialState: AnnouncementCreateState = {
  status: "pending",
  internalErrors: null, 
  topic: {
    value: "",
    errors: null,
  },
  description: {
    value: "",
    errors: null,
  },
  is_visible: {
    value: "true",
    errors: null,
  },
};

interface AnnouncementFormProps {
  moduleId: string;
  announcementUpdate: (action: Announcement) => void;
}

export default function AnnouncementForm({ moduleId, announcementUpdate }: AnnouncementFormProps) {
  const [state, formAction, isPending] = useActionState(
   createAnnouncementAction.bind(null, moduleId),
    initialState
  );

  useEffect(() => {
    if(state.status === "success") {
      const newAnnouncement: Announcement = {
        id: crypto.randomUUID(),
        module_id: moduleId,
        topic: state.topic.value || "",
        description: state.description.value || "",
        is_visible: state.is_visible.value,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      announcementUpdate(newAnnouncement);
    }
  }, [state]);

  return (
    <form action={formAction}>
      {state.status === "success" && (
        <Message type="success" message="Form submitted successfully" />
      )}
      {state.status === "failure" && (
        <Message
          type="error"
          message={
            state.internalErrors?.reduce((acc, curr) => acc + curr + ",") ||
            "Form couldnt submit due to an unknown error"
          }
        />
      )}
      <InputField
        name="topic"
        label="Announcement Topic"
        type="text"
        placeholder="Enter announcement topic"
        defaultValue={state.topic.value}
        error={state.topic.errors?.reduce((acc, curr) => {
          return acc + curr + " ";
        }, "")}
        required
      />
      <InputField
        name="description"
        label="Announcement Description"
        type="textarea"
        placeholder="Enter announcement description"
        defaultValue={state.description.value}
        error={state.description.errors?.reduce((acc, curr) => {
          return acc + curr + " ";
        }, "")}
        required
      />
      <InputField
        type="checkbox"
        name="is_visible"
        label="Is this announcement visible to students?"
        defaultChecked={true}
      />
      <div id="form-controls">
        <Button type="submit">
          {isPending && <Spinner theme="light" width={15} height={15} />} Add announcement
        </Button>
      </div>
    </form>
  );
}
