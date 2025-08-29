import type {
  APIResponse,
  User,
  Module,
  UserWithToken,
  AllModulesResponse,
  FullModule,
  TopicCreate,
  MaterialCreate,
  Announcement,
  AnnouncementCreate,
  Activity,
} from "@/utils/types/backend";
import { Session, Topic } from "@/utils/types/backend";

export const url = "http://127.0.0.1:8000";

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

  // Exchanging the session object with the user object
  get: async (session: Session) => {
    return fetchAPI<User>(`/api/v1/users/${session.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
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
    createAssignmentForTopic: (moduleId: string, topicId: string, assignmentData: Activity) =>
    fetchAPI<Activity>(`/api/v1/modules/${moduleId}/topics/${topicId}/assignment`, {
      method: "POST",
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

  createAnnouncement: (
    moduleId: string,
    announcementData: AnnouncementCreate
  ) =>
    fetchAPI<Announcement>(`/api/v1/modules/${moduleId}/announcements`, {
      method: "POST",
      body: JSON.stringify(announcementData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
  // 🔹 File upload (multipart/form-data)
  uploadMaterial: (topicId: string, formData: FormData) =>
    fetchAPI<Topic>(`/api/v1/topics/${topicId}/materials/upload`, {
      method: "POST",
      body: formData, // no headers → browser sets multipart automatically
    }),
};

const assignments = {
  create: (moduleId: string, assignment: any) =>
    fetchAPI<Activity>(`/api/v1/modules/${moduleId}/activities/assignment`, {
      method: "POST",
      body: JSON.stringify(assignment),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }),

  // 🔹 fetch all assignments in a module
  getByModule: (moduleId: string) =>
    fetchAPI<Activity[]>(`/api/v1/modules/${moduleId}/activities/assignments`),

  // 🔹 fetch a specific assignment
  get: (assignmentId: string) =>
    fetchAPI<Activity>(`/api/v1/activities/assignment/${assignmentId}`),
};

const courses = {
  getModules: (id: string) =>
    fetchAPI<Module[]>(`/api/v1/courses/${id}/modules`),
};

export { user, modules, courses, topics, assignments };
