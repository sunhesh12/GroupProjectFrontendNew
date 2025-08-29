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
  value?: any;
  label?: string;
  placeholder?: string;
  type: "email" | "text" | "password" | "tel" | "number" | "select" | "file" | "textarea" | "date" | "checkbox";
  min?: number;
  max?: number;
  name: string;
  options?: Option[];
  defaultValue?: string;
  defaultChecked?: boolean; // For checkbox type
  required?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  error?: string | null; // Support multiple error messages
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
  defaultChecked,
  borderColor,
  color,
  disabled,
  onChange,
  error,
  value,
}: InputFieldProps) {
  return (
    <div id="input-container" className={styles.inputContainer}>
      {label && type !== "checkbox" && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <span className={styles.errorText}>{error}</span>

      {type === "select" ? (
        <select
          onChange={onChange}
          style={{ backgroundColor, borderColor, color }}
          name={name}
          id={name}
          defaultValue={defaultValue}
          className={`${styles.input} ${
            error ? styles.inputError : ""
          }`}
          required={required}
          disabled={disabled}
        >
          {options?.map((option) => (
            <option key={option.value} className={`${
            error ? styles.inputError : ""
          }`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            defaultChecked={defaultChecked}
            className={`${styles.input} ${workSans.className} ${
            error ? styles.inputError : ""
          }`}
            name={name}
            id={name}
            value={"true"}
            required={required}
            disabled={disabled}
            onChange={onChange}
          />
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        </div>
      )  : type === "textarea" ? (
        <textarea
          className={`${styles.input} ${workSans.className} ${
            error ? styles.inputError : ""
          }`}
          rows={5}
          style={{ backgroundColor, borderColor, color }}
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          min={min}
          max={max}
          className={`${styles.input} ${workSans.className} ${
            error ? styles.inputError : ""
          }`}
          style={{ backgroundColor, borderColor, color }}
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}
