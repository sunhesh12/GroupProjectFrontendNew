export type APIResponse<PayloadType> = {
  version: string;
  payload?: PayloadType;
  message: string;
  success: boolean;
  status: number;
  errors?: string[];
};

export interface MaterialCreate {
  material_type: MaterialTypes;
  material_title: string;
  material_url?: string;
}

export interface Session {
  id: string;
  token: string;
}

export type Module = {
  id: string;
  module_name: string;
  credit_value: number;
  practical_exam_count: number;
  description: string;
  writing_exam_count: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  image: string | null;
  semester: string | null;
  archived: boolean;
  courses: Course[];
};

export type Course = {
  id: number;
  course_name: string;
  credit_value: number;
  maximum_students: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  description: string;
};


export interface User {
  full_name: string;
  age: string;
  email: string;
  mobile_no: string;
  address: string;
  profile_picture: string;
  password: string;
  role: string;
  token: string;
  status: string;
  course_id: string;
  updated_at: string;
  created_at: string;
  id: string;
}

export type UserRequest = Omit<User, "created_at" | "updated_at" | "id">;

export interface Topic {
  id: string;
  module_id: string;
  title: string;
  description: string;
  type: string;
  is_visible: string;
  is_complete: string;
  deadline: string | null; // ISO date string or null if no deadline
  created_at?: string;
  updated_at?: string;
  lecture_materials?: LectureMaterial[];
}

export interface TopicCreate {
  title: string;
  description: string;
  type: string;
  is_visible: boolean;
  deadline?: string | null; // ISO date string or null if no deadline
}

// export interface PortalUser {
//   id: string;
//   Full_Name: string;
//   Age: string;
//   Email: string;
//   Mobile_No: string;
//   Address: string;
//   Profile_Picture: string | null;
//   Password: string;
//   updated_at: string;
//   created_at: string;
//   Role: 'lecturer' | 'student' | 'admin'; // you can adjust roles as needed
//   Status: number; // maybe use enum for 0 = inactive, 1 = active
//   course_id: string | null;
// }

export type MaterialTypes = 'video' | 'document' | 'link' | 'audio' | 'executable' | 'zip' | 'image' | 'website' | 'unknown' | 'error' | 'pdf';

interface LectureMaterial {
  id: number;
  topic_id: number;
  material_type: MaterialTypes;
  material_title: string;
  material_url: string;
  created_at: string; // ISO 8601 timestamp format
  updated_at: string; // ISO 8601 timestamp format
};

export interface Announcement {
  id: string;
  module_id: string;
  topic: string;
  description: string;
  is_visible: string;
  created_at: string;
  updated_at: string;
}

export interface CourseWithPivot extends Course {
  pivot: {
    module_id: string;
    course_id: string;
  };
}

export type AllModulesResponse = APIResponse<Module[]>;

export type UserWithToken = {
  user: User;
  token: string;
}
export type FullModule = Module & {
  topics: Topic[];
  announcements: Announcement[];
}
