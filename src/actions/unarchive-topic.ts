"use server"
import { topics } from "@/utils/backend";

export default async function unarchiveModule(topicId: string) {
    const archiveResponse = await topics.unarchive(moduleId);

    if(archiveResponse.status !== 200) {
        return {
            success: false,
            error: archiveResponse.errors
        }
    }

    return {
        success: true,
        message: "Module archived successfully"
    }
}