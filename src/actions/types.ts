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