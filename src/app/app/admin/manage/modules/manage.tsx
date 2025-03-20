"use client";

import { useReducer } from "react";
import type { User } from "@/utils/types/backend";
import { Table } from "@/components/table/view";
import type { TableRowType } from "@/components/table/view";
import { useAppControls } from "@/hooks/use-app-controls";
import { faPlus, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import UserUpdateForm from "./student-update-form";
import UserCreateForm from "./student-create-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NobgButton from "@/components/buttons/nobg/view";
import Button from "@/components/buttons/view";

// TODO: Connect backend

interface ManageProps {
  users: User[];
}

interface Action {
  type: "create" | "update" | "delete" | "select" | "edit" | "clear";
  id?: number;
  payload?: User;
}

type Reducer = (
  state: TableRowType<User>[],
  action: Action
) => TableRowType<User>[];

function prepare(users: User[]): TableRowType<User>[] {
  return users.map((user, index) => ({
    state: {
      id: index,
      selected: false,
      editable: false,
    },
    data: user,
  }));
}

function reducer(
  state: TableRowType<User>[],
  action: Action
): TableRowType<User>[] {
  switch (action.type) {
    case "create":
      return [
        {
          state: {
            id: state.length + 1,
            selected: false,
            editable: true,
          },
          data: {
            id: "", // Assuming default ID as 0 (adjust based on backend logic)
            full_name: "",
            age: "",
            email: "",
            address: "",
            profile_picture: "",
            mobile_no: "",
            password: "",
            role: "",
            status: "",
            course_id: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        },
        ...state,
      ];

    case "update":
      return state.map((row) =>
        row.state.id === action.id
          ? {
              ...row,
              data: {
                ...row.data,
                ...(action.payload as Partial<User>), // Directly update user properties
              },
            }
          : row
      );

    case "delete":
      return state.filter((row) => row.state.id !== action.id);

    case "select":
      return state.map((row) =>
        row.state.id === action.id
          ? { ...row, state: { ...row.state, selected: !row.state.selected } }
          : row
      );

    case "edit":
      return state.map((row) =>
        row.state.selected
          ? { ...row, state: { ...row.state, editable: true } }
          : row
      );

    case "clear":
      return state.map((row) => ({
        ...row,
        state: { ...row.state, editable: false, selected: false },
      }));

    default:
      throw new Error("Invalid action type");
  }
}

export default function Manage({ users }: ManageProps) {
  const { openMessageBox } = useAppControls();
  // Has expensive computation
  const [state, dispatch] = useReducer<Reducer, User[]>(
    reducer,
    users,
    prepare
  );
  // Don't add any executions
  return (
    <div id="usersManage">
      <NobgButton
        icon={faPlus}
        onClick={() => {
          openMessageBox(
            <UserCreateForm
            />
            // <div
            //   style={{
            //     color: "green",
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "left",
            //   gap: "30px",
            //   }}
            // >
            //   <div>
            //     <FontAwesomeIcon icon={faCircleCheck} width={20} height={20} />
            //     Course created successfully<br />
            //   </div>
            //   <Button fontSize="15px">View course</Button>
            // </div>
          );
        }}
      >
        Create new course
      </NobgButton>
      <Table
        rows={[]}
        columns={[
          { name: "Id", type: "text", inputName: "id" },
          { name: "Module name", type: "text", inputName: "full_name" },
          { name: "Credit value", type: "number", inputName: "age" },
          { name: "Semester", type: "email", inputName: "email" },
          { name: "Course id", type: "text", inputName: "address" },
        ]}
        rowAction={(tableRow: TableRowType<User>) => {
          openMessageBox(<UserUpdateForm tableRow={tableRow} />);
        }}
      />
    </div>
  );
}
