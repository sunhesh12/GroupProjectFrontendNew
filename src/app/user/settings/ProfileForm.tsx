import React from "react";
import styles from "./settings.module.css";
import InputField from "./InputField";
import { UserSettingsData } from "./type";

interface ProfileFormProps {
  formData: UserSettingsData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditable: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  handleInputChange,
  isEditable,
}) => {
  const formFields = [
    {
      label: "Full Name",
      type: "text",
      name: "fullName",
      value: formData.fullName,
    },
    { label: "Email", type: "email", name: "email", value: formData.email },
    {
      label: "Address",
      type: "text",
      name: "address",
      value: formData.address,
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phoneNumber",
      value: formData.phoneNumber,
    },
    { label: "Age", type: "number", name: "age", value: formData.age },
    {
      label: "Change Password",
      type: "password",
      name: "password",
      value: formData.password,
      placeholder: "Enter New Password",
    },
  ];

  return (
    <>
      <div className={styles.ProfileFormHeading}>
        <h1>Profile Settings</h1>
      </div>
      <div className={styles.profileSettings}>
        {formFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={handleInputChange}
            disabled={!isEditable}
            placeholder={field.placeholder}
          />
        ))}
      </div>
    </>
  );
};

export default ProfileForm;
