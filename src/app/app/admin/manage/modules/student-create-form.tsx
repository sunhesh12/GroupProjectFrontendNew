"use client";
import { useActionState } from "react";
import InputField from "@/components/input/view";
import styles from "./page.module.css";
import Button from "@/components/buttons/view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface CourseCreateFormProps {}

export default function CourseCreateForm({}: CourseCreateFormProps) {
  // const [state, formAction, pending] = useActionState(createCourse, {
  //   data: {
  //     id: "COURSE123",
  //     course_name: "Introduction to Programming",
  //     credit_value: "3",
  //     maximum_students: "50",
  //     description: "This is a beginner-level course on programming.",
  //     status: "active",
  //   },
  // });

  return (
    <form className={styles.userUpdateForm}>
      <header>
        <h1>Create Course</h1>
        <p>Create a new course for the LMS</p>
      </header>
      <div
        style={{
          color: "red",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          gap: "30px",
        }}
      >
        <div>
          <FontAwesomeIcon icon={faCircleXmark} width={20} height={20} />
          Invalid course fields
          <br />
        </div>
      </div>
      <InputField
        type="text"
        label="Course ID"
        name="id"
        defaultValue="COURSE123"
        errors={undefined}
      />
      <InputField
        type="text"
        label="Course Name"
        name="course_name"
        defaultValue="Introduction to Programming"
        errors={undefined}
      />
      <InputField
        type="text"
        label="Credit Value"
        name="credit_value"
        defaultValue="3"
        errors={undefined}
      />
      <InputField
        type="number"
        label="Maximum Students"
        name="maximum_students"
        defaultValue="50"
        errors={undefined}
      />
      <InputField
        type="text"
        label="Description"
        name="description"
        defaultValue="This is a beginner-level course on programming."
        errors={undefined}
      />
      <InputField
        type="select"
        label="Status"
        name="status"
        defaultValue="active"
        options={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        errors={undefined}
      />
      <div className={styles.controls}>
        <Button fontSize="15px" type="submit" isLoading={false}>
          Create Course
        </Button>
        <Button fontSize="15px" type="reset">
          Reset
        </Button>
      </div>
    </form>
  );
}
