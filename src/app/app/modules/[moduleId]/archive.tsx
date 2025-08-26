"use client";
import NobgButton from "@/components/buttons/nobg/view";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import unarchiveModule from "@/actions/unarchive-module";
import styles from "./page.module.css";

interface ArchiveModuleProps {
  moduleId: string;
  role: string;
}

export default function ArchiveModule({moduleId, role}: ArchiveModuleProps) {
  return (
    <main className={styles.main}>
        <h1>This module has been archived</h1>
        <p>Archived modules are no longer accessible.</p>
        {role === "lecturer" && (
          <NobgButton icon={faServer} onClick={() => unarchiveModule(moduleId)}>Unarchive</NobgButton>
        )}
      </main>
  );
}