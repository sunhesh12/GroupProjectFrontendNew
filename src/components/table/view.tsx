"use client";
import styles from "./style.module.css";
import { TableRow } from "./table-row/view";

export interface TableRowType<T> {
  state: {
    id: number;
    selected: boolean;
    editable: boolean;
  };
  data: T;
}

export interface TableColumnType<T> {
  name: string;
  type: "number" | "email" | "text" | "tel" | "disabled" | "password";
  inputName: keyof T;
}

interface TableProps<T> {
  rows: TableRowType<T>[];
  columns: TableColumnType<T>[];
  rowAction: (tableRow: TableRowType<T>) => void;
}

// Null is set to make a field uneditable
export type Fields = {
  type: "number" | "email" | "text" | "tel" | "disabled" | "password";
  name: string;
  default?: string;
}[];

export interface RowState {
  id: number;
  selected: boolean;
  edited: boolean;
}

export function Table<T>({
  rows,
  columns,
  rowAction,
}: TableProps<T>) {
  // Tracking all the rows inside the table
  return (
    <div id="tableWrapper" className={styles.wrapper}>
      <table className={styles.courseTable}>
        {/* HEADER */}
        <thead>
          <tr className={styles.courseTableHeader}>
            <th></th>
            {columns.map(({ name }, index) => {
              return <th key={index}>{name}</th>;
            })}
          </tr>
        </thead>
        {/* BODY */}
        <tbody className={styles.courseTableBody}>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              tableRow={row}
              tableColumns={columns}
              rowAction={rowAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
