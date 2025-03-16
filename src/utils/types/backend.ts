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

export interface Module {
  id: string;
  module_name: string;
  credit_value: string;
  practical_exam_count: string | null;
  writing_exam_count: string | null;
  course_id: string;
  created_at: string | null;
  updated_at: string | null;
  courses: Course[];
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
