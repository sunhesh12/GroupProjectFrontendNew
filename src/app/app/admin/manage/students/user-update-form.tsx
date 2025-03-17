"use client";
import { useActionState } from "react";
import InputField from "@/components/input/view";
import { TableRowType } from "@/components/table/view";
import styles from "./page.module.css";
import Button from "@/components/buttons/view";
import { User } from "@/utils/types/backend";

interface UserUpdateFormProps {
  tableRow: TableRowType<User>;
}

export interface UpdateFormState {
  email: { value: string; error?: string };
  full_name: { value: string; error?: string };
  age: { value: string; error?: string };
  address: { value: string; error?: string };
  profile_pic: { value: string; error?: string };
  password: { value: string; error?: string };
  password_confirm: { value: string; error?: string };
  status: { value: string; error?: string };
  role: { value: string; error?: string };
  course_id: { value: string; error?: string };
}

export const initialData: UpdateFormState = {
  email: {
    value: "",
  },
  full_name: {
    value: "",
  },
  age: {
    value: "",
  },
  address: {
    value: "",
  },
  profile_pic: {
    value: "",
  },
  password: {
    value: "",
  },
  password_confirm: {
    value: "",
  },
  status: {
    value: "",
  },
  role: {
    value: "",
  },
  course_id: {
    value: "",
  },
};

export default function UserUpdateForm({ tableRow }: UserUpdateFormProps) {
  const [state, formAction, pending] = useActionState(updateUsers, initialData);
  return (
    <form className={styles.userUpdateForm} action={formAction}>
      <header>
        <h1>Update student</h1>
        <p>
          Update student info related <span>{tableRow.data.full_name}</span>
        </p>
      </header>
      <InputField
        type="text"
        label="ID"
        disabled={true}
        defaultValue={tableRow.data.id}
      />
      <InputField
        type="email"
        label="Email"
        name="email"
        required={true}
        defaultValue={tableRow.data.email}
      />
      <InputField
        type="text"
        label="Name"
        name="full_name"
        required={true}
        defaultValue={tableRow.data.full_name}
      />
      <InputField
        type="number"
        label="Age"
        name="age"
        required={true}
        defaultValue={tableRow.data.age}
      />
      <InputField
        type="text"
        label="Name"
        name="address"
        required={true}
        defaultValue={tableRow.data.address}
      />
      <InputField
        type="text"
        label="Profile picture"
        name="profile_pic"
        required={true}
        defaultValue={tableRow.data.profile_picture}
      />
      <InputField
        type="password"
        label="Password"
        name="password"
        required={true}
        defaultValue={tableRow.data.password}
      />
      <InputField
        type="password"
        label="Password"
        name="password_confirm"
        required={true}
        defaultValue={tableRow.data.password}
      />
      <InputField
        type="select"
        label="Account status"
        name="status"
        defaultValue={tableRow.data.status}
        required={true}
        options={[
          { value: "1", label: "Active" },
          { value: "2", label: "Deactive" },
        ]}
      />
      <InputField
        type="select"
        label="Change role"
        name="role"
        defaultValue={tableRow.data.status}
        required={true}
        options={[
          { value: "student", label: "Student" },
          { value: "lecturer", label: "Lecturer" },
          { value: "admin", label: "Admin" },
        ]}
      />
      <InputField
        type="select"
        name="course_id"
        label="Select your course"
        defaultValue="2"
        options={[
          { value: "1", label: "Software Engineering" },
          { value: "2", label: "Information Systems" },
          { value: "3", label: "Computer Science" },
        ]}
        required={true}
      />
      <div className={styles.controls}>
        <Button width="150px" fontSize="15px" type="submit">
          Update
        </Button>
        <Button width="150px" fontSize="15px" type="submit">
          Reset
        </Button>
      </div>
    </form>
  );
}
