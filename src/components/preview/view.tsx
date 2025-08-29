"use client";
import React from "react";
import { faDownload, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { LectureMaterial } from "@/utils/types/backend";
import styles from "./style.module.css";

interface MaterialPreviewProps {
  material: LectureMaterial;
}

export default function Preview({ material }: MaterialPreviewProps) {
  const isFile = !!material.file_path;
  const isLink = !!material.material_url;

  const fileUrl = isFile ? `http://127.0.0.1:8000/storage/${material.file_path}` : null;
  console.log(fileUrl);
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.title}>{material.material_title}</h3>
        <p className={styles.type}>{material.material_type}</p>
      </div>

      <div className={styles.actions}>
        {isLink && (
          <a
            href={material.material_url!}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.linkButton}`}
          >
            <FontAwesomeIcon icon={faLink} width={16} height={16} />
            Open
          </a>
        )}

        {isFile && (
          <a
            href={fileUrl!}
            download={material.material_title}
            className={`${styles.button} ${styles.downloadButton}`}
          >
            <FontAwesomeIcon icon={faDownload} width={16} height={16} />
            Download
          </a>
        )}
      </div>
    </div>
  );
}
