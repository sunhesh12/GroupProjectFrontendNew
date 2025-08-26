import { MaterialTypes } from "@/utils/types/backend";

export interface SignInState {
    status: "pending" | "success" | "failiure",
    internalErrors: string[] | null,
    email: {
        value: string;
        errors: string[] | null;
    };
    password: {
        value: string;
        errors: string[] | null;
    }
}

export interface TopicCreateState {
    status: "pending" | "success" | "failiure",
    internalErrors: string[] | null,
    id: {
        value: string;
        errors: string[] | null;
    }
    type: {
        value: string;
        errors: string[] | null;
    },
    title: {
        value: string;
        errors: string[] | null;
    },
    deadline?: {
        value: string;
        errors: string[] | null;
    }
    description: {
        value: string;
        errors: string[] | null;
    },
    is_visible: {
        value: string;
        errors: string[] | null;
    }
}

export interface MaterialCreateState {
    status: "pending" | "success" | "failiure",
    internalErrors: string[] | null,
    material_type: {
        value: MaterialTypes,
        errors: string[] | null,
      },
      material_title: {
        value: string,
        errors: string[] | null,
      },
      material_url: {
        value: string | null | undefined,
        errors: string[] | null,
      },
}