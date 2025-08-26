import type {
  APIResponse,
  User,
  Module,
  UserWithToken,
  AllModulesResponse,
  FullModule,
  TopicCreate,
  MaterialCreate,
} from "@/utils/types/backend";
import { Session, Topic } from "@/utils/types/backend";

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
  },

  get: async (user: User) => {
    return fetchAPI<User>(`/api/v1/users/${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },

  modules: async (user: User) =>
    fetchAPI<Module[]>(`/api/v1/users/${user.id}/enrolled/modules`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),

  create: (newUser: Partial<User>) =>
    fetchAPI<User>("/api/v1/users/", {
      method: "POST",
      body: JSON.stringify(newUser),
    }),

  getAll: () => fetchAPI<User[]>("/api/v1/users/"),

  getStudents: () => fetchAPI<User[]>("/api/v1/users/students"),

  getLecturers: () => fetchAPI<User[]>("/api/v1/users/lecturers"),

  getTeachingModules: (user: User) =>
    fetchAPI<Module[]>(`/api/v1/users/${user.id}/teaching/modules`),

  update: (updatedUser: Partial<User>) =>
    fetchAPI<User>(`/api/v1/users/${updatedUser.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
    }),
};

const modules = {
  getAll: () => fetchAPI<AllModulesResponse>("/api/v1/modules"),
  get: (id: string) => fetchAPI<FullModule>(`/api/v1/modules/${id}`),
  createTopic: (moduleId: string, topicData: TopicCreate) =>
    fetchAPI<Topic>(`/api/v1/modules/${moduleId}/topics`, {
      method: "POST",
      body: JSON.stringify(topicData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }),
  archive: (moduleId: string) =>
    fetchAPI<null>(`/api/v1/modules/${moduleId}/archive`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),

  unarchive: (moduleId: string) =>
    fetchAPI<null>(`/api/v1/modules/${moduleId}/unarchive`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
};

const topics = {
  get: (moduleId: string) =>
    fetchAPI<Topic[]>(`/api/v1/modules/${moduleId}/topics`),
  addMaterial: (topicId: string, materialData: MaterialCreate) =>
    fetchAPI<Topic>(`/api/v1/topics/${topicId}/materials`, {
      method: "POST",
      body: JSON.stringify(materialData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }),
  archive: (moduleId: string) =>
    fetchAPI<null>(`/api/v1/topics/${moduleId}/archive`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),

  unarchive: (moduleId: string) =>
    fetchAPI<null>(`/api/v1/topics/${moduleId}/unarchive`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
};

const courses = {
  getModules: (id: string) =>
    fetchAPI<Module[]>(`/api/v1/courses/${id}/modules`),
};

export { user, modules, courses, topics };
