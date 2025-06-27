"use server"
import { modules } from "@/utils/backend";

export default async function unarchiveModule(moduleId: string) {
    const archiveResponse = await modules.unarchive(moduleId);

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