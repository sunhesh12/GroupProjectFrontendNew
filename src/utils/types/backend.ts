export type APIResponse<PayloadType> = {
  version: string;
  payload?: PayloadType;
  message: string;
  success: boolean;
  status: number;
  errors?: string[];
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
  created_at: string;
  updated_at: string;
  lecture_materials: LectureMaterial[];
}

export interface PortalUser {
  id: string;
  Full_Name: string;
  Age: string;
  Email: string;
  Mobile_No: string;
  Address: string;
  Profile_Picture: string | null;
  Password: string;
  updated_at: string;
  created_at: string;
  Role: 'lecturer' | 'student' | 'admin'; // you can adjust roles as needed
  Status: number; // maybe use enum for 0 = inactive, 1 = active
  course_id: number | null;
}

export type MaterialTypes = 'video' | 'document' | 'link' | 'audio' | 'executable' | 'zip' | 'image' | 'website' | 'unknown' | 'error' | 'pdf';

interface LectureMaterial {
  id: number;
  topic_id: number;
  material_type: MaterialTypes; // Adjust based on your use cases
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

export interface Module {
  id: string;
  module_name: string | null;
  credit_value: string | null;
  semester: string | null;
  image: string | null;
  practical_exam_count: string | null;
  writing_exam_count: string | null;
  course_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  pivot?: {
    module_id: string;
    course_id: string;
  };
  activities: {
    id: string;
    activity_name: string | null;
    type: "lesson";
    start_date: string | null;
    start_time: string | null;
    end_date: string | null;
    end_time: string | null;
    instructions: string | null;
    question_count: string;
    module_id: string | null;
    created_at: string | null;
    updated_at: string | null;
  }[];
  topics: Topic[];
  teachers: PortalUser[];
  annoucements: Announcement[];
}

export interface Course {
  id: string;
  course_name: string;
  credit_value: string;
  maximum_students: string;
  created_at: string;
  updated_at: string | null;
  description: string | null;
  pivot: {
    module_id: string;
    course_id: string;
  };
}

export interface CourseWithPivot extends Course {
  pivot: {
    module_id: string;
    course_id: string;
  };
}

export interface ModuleWithCourses extends Module {
  courses: CourseWithPivot[];
}

export type UserWithToken = {
  user: User;
  token: string;
};
