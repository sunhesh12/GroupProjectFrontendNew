"use client";
import { useState } from "react";
import NobgButton from "@/components/buttons/nobg/view";
import Button from "@/components/buttons/view";
import styles from "./topic-toolbar.module.css";
import { faAdd, faEdit, faServer } from "@fortawesome/free-solid-svg-icons";
import MessageBox from "@/components/messagebox/view";
import AddMaterialForm from "./add-material-form";

interface TopicToolbarProps {
  topicId: string;
}

export default function TopicToolbar({ topicId }: TopicToolbarProps) {
  const [addMaterial, setAddMaterial] = useState(false);
  const [editTopic, setEditTopic] = useState(false);
  return (
    <div id="topic-toolbar" className={styles.toolbar}>
      <MessageBox
        visible={addMaterial}
        closeAction={() => setAddMaterial(false)}
      >
        <AddMaterialForm topicId={topicId} />
      </MessageBox>
      <NobgButton icon={faAdd} onClick={() => setAddMaterial(true)}>
        Add material
      </NobgButton>
      <NobgButton icon={faEdit} onClick={() => setEditTopic(true)}>
        Edit topic
      </NobgButton> 
      <Button backgroundColor="#B22222" icon={faServer} onClick={() => {}}>
        Archive Topic
      </Button>
    </div>
  );
}
