export type FormState = {
    email: {
      value: string;
      error: string | null;
    };
    password: {
      value: string;
      error: string | null;
    };
    state: "pending" | "success" | "error";
    message: string;
}