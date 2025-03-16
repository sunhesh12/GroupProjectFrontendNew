"use client";

import { useReducer } from "react";
import type { User } from "@/utils/types/backend";
import { Table } from "@/components/table/view";
import type { TableRowType } from "@/components/table/view";
import { updateUsers } from "@/actions/update-users";
import { useAppControls } from "@/hooks/use-app-controls";

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

function dbPrepare(state: TableRowType<User>[]) {
  return state.map((tableRow) => ({
    full_name: tableRow.data.full_name,
    age: tableRow.data.age,
    email: tableRow.data.email,
    address: tableRow.data.address,
    profile_picture: tableRow.data.profile_picture,
    mobile_no: tableRow.data.mobile_no,
    password: tableRow.data.password,
    role: tableRow.data.role,
    status: tableRow.data.status,
    course_id: tableRow.data.course_id,
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
  const {openMessageBox} = useAppControls();
  // Has expensive computation
  const [state, dispatch] = useReducer<Reducer, User[]>(
    reducer,
    users,
    prepare
  );
  // Don't add any executions
  return ( 
    <div id="usersManage">
      <button onClick={() => {
        openMessageBox(
          <div>
            dasdasdsa
          </div>
        )
      }}>Show message</button>
      <Table
        rows={state}
        title="Hello table"
        columns={[
          { name: "Id", type: "text", inputName: "id" },
          { name: "Full name", type: "text", inputName: "full_name" },
          { name: "Age", type: "number", inputName: "age" },
          { name: "Address", type: "text", inputName: "address" },
          {
            name: "Profile picture",
            type: "text",
            inputName: "profile_picture",
          },
          { name: "Password", type: "password", inputName: "password" },
          { name: "Status", type: "text", inputName: "status" },
          { name: "Course id", type: "text", inputName: "course_id" },
          { name: "Created at", type: "disabled", inputName: "created_at" },
          { name: "Updated at", type: "disabled", inputName: "updated_at" },
        ]}
        rowAction={() => {
          openMessageBox(
            <div>
              From Row action
            </div>
          )
        }}
      />
    </div>
  );
}
