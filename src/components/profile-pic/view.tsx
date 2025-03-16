import Image from "next/image";
import styles from "./style.module.css";

type ProfilePicProps = {
  src: string;
  alt: string;
  width: number;
};

export default function ProfilePic({ src, alt, width }: ProfilePicProps) {
  return (
    <Image
      src={src}
      className={styles.profilePic}
      alt={alt}
      width={width}
      height={width}
    />
  );
}
