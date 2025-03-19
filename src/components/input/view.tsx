"use client";
import { Work_Sans } from "next/font/google";
import styles from "./style.module.css";
import { ChangeEventHandler } from "react";

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
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  errors?: string[]; // Support multiple error messages
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
 *   - disabled?: boolean
 *   - errors?: string[] (Handles multiple error messages)
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
  color,
  disabled,
  onChange,
  errors = [],
}: InputFieldProps) {
  return (
    <div id="input-container" className={styles.inputContainer}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          onChange={onChange}
          style={{ backgroundColor, borderColor, color }}
          name={name}
          id={name}
          defaultValue={defaultValue}
          className={`${styles.input} ${
            errors.length ? styles.inputError : ""
          }`}
          required={required}
          disabled={disabled}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          min={min}
          max={max}
          className={`${styles.input} ${workSans.className} ${
            errors.length ? styles.inputError : ""
          }`}
          style={{ backgroundColor, borderColor, color }}
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          onChange={onChange}
        />
      )}

      {/* Display multiple error messages */}
      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            <li key={index} className={styles.errorText}>
              {error}
              {error.length > 1 && index != errors.length - 1 && (
                <span>, &nbsp;</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
