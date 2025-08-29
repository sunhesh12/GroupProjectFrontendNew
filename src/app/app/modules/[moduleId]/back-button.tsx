"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/buttons/icon/view";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <IconButton
      icon={faArrowLeft}
      width={40}
      height={40}
      onClick={() => {
        router.push("/app/modules");
      }}
      color="white"
    />
  );
}
