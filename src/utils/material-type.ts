import type { MaterialTypes } from "@/utils/types/backend";

export async function detectMaterialType(url: string): Promise<MaterialTypes> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
    });
    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
      return "error";
    }

    if (contentType) {
      if (contentType.startsWith("image/")) {
        return "image";
      } else if (contentType.startsWith("video/")) {
        return "video";
      } else if (contentType.startsWith("audio/")) {
        return "audio";
      } else if (contentType.startsWith("text/html")) {
        return "website";
      } else if (contentType.startsWith("application/pdf")) {
        return "pdf";
      } else {
        return "document";
      }
    } else {
      console.warn("No Content-Type header found");
    }

    // Fallback to URL extension if Content-Type is not available
    const extension = url.split(".").pop()?.split(/\#|\?/)[0].toLowerCase();
    if (extension) {
      switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image";
        case "mp4":
        case "avi":
        case "mov":
          return "video";
        case "mp3":
        case "wav":
          return "audio";
        case "pdf":
          return "pdf";
        case "zip":
          return "zip";
        default:
          return "document";
      }
    }
    console.warn("No valid extension found in URL");
    return "unknown";
  } catch (error) {
    console.warn("Error fetching URL:", error);
    return "error";
  }
}

export async function getThumbnailLink(url: string) {
  const youtubeUrl = new URL(url);
  const videoId = youtubeUrl.searchParams.get("v");
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } else {
    throw new Error("Invalid YouTube URL");
  }
}
