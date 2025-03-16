"use client";
import React, { useState } from "react";
import UserProfile from "./UserProfile";
import ProfileForm from "./ProfileForm";
import Notifications from "./Notifications";
import styles from "./settings.module.css";
import { UserSettingsData, NotificationsData } from "./type";
import Form from "next/form";

export default function UserSettings() {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState<UserSettingsData>({
    fullName: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    address: "Havelock City",
    phoneNumber: "077895545",
    age: "25",
    password: "",
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [name]: checked },
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Settings</h1>
      <p className={styles.subHeading}>Edit Your Details</p>

      {/* User Profile Section */}
      <UserProfile
        fullName={formData.fullName}
        email={formData.email}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      />

      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
      <Form action={"#"}>
        {/* Profile Form */}
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          isEditable={isEditable}
        />

        {/* Notifications */}
        <Notifications
          notifications={formData.notifications}
          handleCheckboxChange={handleCheckboxChange}
          isEditable={isEditable}
        />

        {/* Save Changes Button */}
        <div className={styles.button}>
          <button className={styles.saveButton} disabled={!isEditable}>
            Save Changes
          </button>
        </div>
      </Form>
    </div>
  );
}
