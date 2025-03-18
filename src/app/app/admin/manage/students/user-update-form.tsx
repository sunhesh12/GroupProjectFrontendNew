"use client";
import { useActionState } from "react";
import InputField from "@/components/input/view";
import { TableRowType } from "@/components/table/view";
import styles from "./page.module.css";
import Button from "@/components/buttons/view";
import { User } from "@/utils/types/backend";
import updateUser from "@/actions/update-users";

interface UserUpdateFormProps {
  tableRow: TableRowType<User>;
}

export default function UserUpdateForm({ tableRow }: UserUpdateFormProps) {
  const [state, formAction, pending] = useActionState(updateUser, {
    data: {
      id: tableRow.data.id,
      email: tableRow.data.email,
      full_name: tableRow.data.full_name,
      age: tableRow.data.age,
      address: tableRow.data.address,
      profile_picture: tableRow.data.profile_picture,
      password: tableRow.data.password,
      confirm_password: tableRow.data.password,
      mobile_no: tableRow.data.mobile_no,
      status: tableRow.data.status,
      role: tableRow.data.role,
      course_id: tableRow.data.course_id,
    },
  });
  console.log("Submitted ! ", state.data);
  console.warn(state.errors);
  return (
    <form className={styles.userUpdateForm} action={formAction}>
      <header>
        <h1>Update student</h1>
        <p>
          Update student info related <span>{tableRow.data.full_name}</span>
        </p>
        <p>{pending ? "Updating" : ""}</p>
      </header>
      <InputField
        type="text"
        label="Id"
        name="id"
        defaultValue={state.data.id}
      />
      <InputField
        type="email"
        label="Email"
        name="email"
        required={true}
        defaultValue={state.data.email}
      />
      <InputField
        type="tel"
        label="Mobile"
        name="mobile_no"
        required={true}
        defaultValue={state.data.mobile_no}
      />
      <InputField
        type="text"
        label="Name"
        name="full_name"
        required={true}
        defaultValue={state.data.full_name}
      />
      <InputField
        type="number"
        label="Age"
        name="age"
        required={true}
        defaultValue={state.data.age}
      />
      <InputField
        type="text"
        label="Name"
        name="address"
        required={true}
        defaultValue={state.data.address}
      />
      <InputField
        type="text"
        label="Profile picture"
        name="profile_picture"
        required={true}
        defaultValue={state.data.profile_picture}
      />
      <InputField
        type="password"
        label="Password"
        name="password"
        required={true}
        defaultValue={state.data.password}
      />
      <InputField
        type="password"
        label="Password"
        name="password_confirm"
        required={true}
        defaultValue={state.data.password}
      />
      <InputField
        type="select"
        label="Account status"
        name="status"
        defaultValue={state.data.status}
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
        defaultValue={state.data.status}
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
        defaultValue={state.data.course_id}
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
