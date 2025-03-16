import React from "react";
import styles from "./settings.module.css";

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  placeholder,
}) => (
  <div className={styles.formRow}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      defaultValue={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
