"use client";
import styles from "./style.module.css";
import type { TableColumnType, TableRowType } from "../view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface TableRowProps<T> {
  tableColumns: TableColumnType<T>[];
  tableRow: TableRowType<T>;
  rowAction: (row: TableRowType<T>) => void;
}

export function TableRow<T>({
  tableRow,
  tableColumns,
  rowAction,
}: TableRowProps<T>) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <tr
      className={styles.courseTableRow}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <td>
        {isVisible && (
          <button className={styles.selectButton} onClick={() => rowAction(tableRow)}>
            <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          </button>
        )}
      </td>
      {tableColumns.map((column, index) => (
        <td key={index}>{String(tableRow.data[column.inputName])}</td>
      ))}
    </tr>
  );
}
