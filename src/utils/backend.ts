import type {
  APIResponse,
  User,
  Module,
  Course,
  UserWithToken,
  ModuleWithCourses,
  PortalUser,
  AllModulesResponse,
} from "@/utils/types/backend";
import { cookies } from "next/headers";

export const url = process.env.BACKEND_URL;

const handleResponse = async <T>(
  request: Response
): Promise<APIResponse<T>> => {
  try {
    return await request.json();
  } catch (error) {
    console.error("Error parsing response JSON:", error);
    throw new Error("Invalid JSON response from server");
  }
};

const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> => {
  try {
    const request = await fetch(`${url}${endpoint}`, options);
    console.log(request.url);

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

    get: async (session: { userId: string; token: string }) => {
      return fetchAPI<UserWithToken>(`/api/v1/users/${session.userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    },
  },

  modules: async (session: { userId: string; token: string }) =>
      fetchAPI<Module[]>(`/api/v1/users/${session.userId}/enrolled/modules`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }),

  create: (newUser: Partial<User>) =>
    fetchAPI<User>("/api/v1/users/", {
      method: "POST",
      body: JSON.stringify(newUser),
    }),

  get: (id: string) => fetchAPI<PortalUser>(`/api/v1/users/${id}`),

  getAll: () => fetchAPI<User[]>("/api/v1/users/"),

  getStudents: () => fetchAPI<User[]>("/api/v1/users/students"),

  getLecturers: () => fetchAPI<User[]>("/api/v1/users/lecturers"),

  getTeachingModules: (id: string) =>
    fetchAPI<Module[]>(`/api/v1/users/${id}/teaching/modules`),

  update: (updatedUser: Partial<User>) =>
    fetchAPI<User>(`/api/v1/users/${updatedUser.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
    }),
};

const modules = {
  getAll: () => fetchAPI<AllModulesResponse>("/api/v1/modules"),
  get: (id: string) => fetchAPI<Module>(`/api/v1/modules/${id}`),
};

const courses = {
  getModules: (id: string) =>
    fetchAPI<Module[]>(`/api/v1/courses/${id}/modules`),
};

export { user, modules, courses };
