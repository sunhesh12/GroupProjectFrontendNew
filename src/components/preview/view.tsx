"use client";
import Card from "../card/view";
import Image from "next/image";
import styles from "./style.module.css";
import { getThumbnailLink } from "@/utils/material-type";
import { MaterialTypes } from "@/utils/types/backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faExclamationTriangle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { detectMaterialType } from "@/utils/material-type";

interface PreviewProps {
  title: string;
  link: string;
}

export default async function Preview({ title, link }: PreviewProps) {
  const dimentions = {
    width: 500,
    height: 300,
  };
  const url = new URL(link);
  const domain = url.hostname.replace("www.", "");
  const type = await detectMaterialType(link);


  if (domain === "youtube.com") {
    const thumnail = await getThumbnailLink(link);

    return (
      <Card link={link}>
        <div className={styles.cardImageContainer}>
          <Image
            src={thumnail} 
            alt="YouTube thumbnail"
            width={dimentions.width}
            height={dimentions.height}
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay} />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>{title}</div>
        </div>
      </Card>
    );
  }

  if (type === "image") {
    return (
      <Card>
        <div className={styles.cardImageContainer}>
          <Image
            src={link}
            alt="Image"
            width={dimentions.width}
            height={dimentions.height}
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay} />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>{title}</div>
        </div>
      </Card>
    );
  }

  if (type === "video") {
    return (
      <Card>
        <div className={styles.cardImageContainer}>
          <video
            id="video-preview"
            width={dimentions.width}
            height={dimentions.height}
            src={link}
            controls
          />
          <div className={styles.cardOverlay} />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>{title}</div>
        </div>
      </Card>
    );
  }

  if (type === "audio") {
    return (
      <Card>
        <div className={styles.cardImageContainer}>
          <audio
            id="video-preview"
            src={link}
            controls
          />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>{title}</div>
        </div>
      </Card>
    );
  }

  if(type === "error") {
    return (
      <Card>
        <div className={styles.invalidCardContent}>
          <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
          <div className={styles.fileInfo}>
            <p>{title}</p>
            <span>Not found</span>
          </div>
        </div>
      </Card>
    )
  }

  if(type === "unknown") {
    return (
      <Card link={link}>
        <div className={styles.invalidCardContent}>
          <FontAwesomeIcon icon={faQuestion} size="2x" />
          <div className={styles.fileInfo}>
            <p>{title}</p>
            <span>Unknown file type</span>
          </div>
        </div>
      </Card>
    );
  }

  if(type === "pdf") {
    <Card link={link}>
        <div className={styles.invalidCardContent}>
          <FontAwesomeIcon icon={faQuestion} size="2x" />
          <div className={styles.fileInfo}>
            <p>{title}</p>
            <span>PDF Document</span>
          </div>
        </div>
    </Card>
  }

  return (
    <Card link={link}>
       <div className={styles.invalidCardContent}>
          <FontAwesomeIcon icon={faFile} size="2x" />
          <div className={styles.fileInfo}>
            <p>{title}</p>
            <span>Document</span>
          </div>
        </div>
    </Card>
  );
}
