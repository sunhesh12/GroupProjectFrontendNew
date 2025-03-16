import type {
  APIResponse,
  User,
  Module,
  Course,
  UserWithToken,
  ModuleWithCourses,
} from "@/utils/types/backend";

export const url = process.env.BACKEND_URL;

const handleResponse = async <T>(request: Response): Promise<APIResponse<T>> => {
  try {
    return await request.json();
  } catch (error) {
    console.error("Error parsing response JSON:", error);
    throw new Error("Invalid JSON response from server");
  }
};

const fetchAPI = async <T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> => {
  try {
    const request = await fetch(`${url}${endpoint}`, options);

    if (!request.ok) {
      console.error(`Error: ${request.status} - ${request.statusText}`);
    }

    return await handleResponse<T>(request);
  } catch (error) {
    console.error("Network error:", error);
    throw new Error("Network error occurred");
  }
};

const user = {
  auth: {
    signup: (formData: FormData) =>
      fetchAPI<UserWithToken>("/api/v1/users/auth/signup", {
        method: "POST",
        body: formData,
      }),

    signin: ({ email, password }: { email: string; password: string }) =>
      fetchAPI<UserWithToken>("/api/v1/users/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),

    signout: async () => {
      return fetchAPI<null>("/api/v1/users/auth/signout", {
        method: "POST",
      });
    },
  },

  get: (id: string) => fetchAPI<User>(`/api/v1/users/${id}`),

  getAll: () => fetchAPI<User[]>("/api/v1/users/"),

  getStudents: () => fetchAPI<User[]>("/api/v1/users/students"),
};

const modules = {
  getAll: () => fetchAPI<ModuleWithCourses[]>("/api/v1/modules"),
};

Object.freeze(modules);
Object.freeze(user);

export { user, modules };