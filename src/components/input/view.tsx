"use client";
import { Work_Sans } from "next/font/google";
import styles from "./style.module.css";

const workSans = Work_Sans({
  subsets: ["latin"],
});

type Option = {
  label: string;
  value: string;
};

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  type: "email" | "text" | "password" | "tel" | "number" | "select" | "file";
  min?: number;
  max?: number;
  name: string;
  options?: Option[];
  defaultValue?: string;
  required?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
};

/**
 * @props InputFieldProps
 *   - label?: string
 *   - placeholder?: string
 *   - type: "email" | "text" | "password" | "tel" | "number" | "select"  | "file"
 *   - min?: number
 *   - max?: number
 *   - name: string
 *   - options?: Option[]
 *   - defaultValue?: string
 *   - required?: boolean
 *   - backgroundColor?: string
 *   - borderColor?: string
 *   - color?: string
 */
export default function InputField({
  label,
  placeholder,
  type,
  name,
  min,
  max,
  options,
  defaultValue,
  required,
  backgroundColor,
  borderColor,
  color
}: InputFieldProps) {
  if (type === "select") {
    return (
      <div id="input-container" className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>
          {label}
        </label>
        <select
          style={{ backgroundColor, borderColor, color }}
          name={name}
          defaultValue={defaultValue}
          className={styles.input}
          required={required}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <div id="input-container" className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>
          {label}
        </label>
        <input
          type={type}
          min={min}
          max={max}
          className={styles.input + " " + workSans.className}
          style={{ backgroundColor, borderColor, color }}
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
        />
      </div>
    );
  }
}
