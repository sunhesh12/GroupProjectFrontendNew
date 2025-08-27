"use client";

import { useState } from "react";
import InputField from "@/components/input/view";
import styles from "./style.module.css";
import { url } from "@/utils/backend";

type User = {
  id: number;
  full_name?: string;
  email?: string;
  mobile_no?: string;
  address?: string;
  age?: number;
  institution?: string;
  role?: string;
  status?: string;
  course_id?: number;
};

type SettingsClientProps = {
  user: User;
  token: string;
  userId: number;
};

export default function SettingsClient({ user, token, userId }: SettingsClientProps) {
  const [formData, setFormData] = useState({
    full_name: user.full_name || "",
    email: user.email || "",
    mobile_no: user.mobile_no || "",
    address: user.address || "",
    age: user.age?.toString() || "",
    institution: user.institution || "",
    password: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.mobile_no.trim()) {
      newErrors.mobile_no = "Phone number is required";
    }

    if (formData.age && (parseInt(formData.age) < 1 || parseInt(formData.age) > 120)) {
      newErrors.age = "Please enter a valid age";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const updateData: any = {
        full_name: formData.full_name,
        email: formData.email,
        mobile_no: formData.mobile_no,
        address: formData.address,
        institution: formData.institution,
      };

      if (formData.age) {
        updateData.age = parseInt(formData.age);
      }

      if (formData.password.trim()) {
        updateData.password = formData.password;
      }

      const response = await fetch(`${url}/api/v1/users/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
        setFormData(prev => ({ ...prev, password: "" })); // Clear password field
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ general: error instanceof Error ? error.message : "Failed to update profile" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {formData.full_name.charAt(0).toUpperCase() || "U"}
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{formData.full_name || "User"}</h2>
            <p className={styles.userEmail}>{formData.email}</p>
          </div>
        </div>
        <button 
          type="submit" 
          form="settings-form"
          className={`${styles.saveButton} ${isLoading ? styles.loading : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {/* General Error */}
      {errors.general && (
        <div className={styles.errorMessage}>
          {errors.general}
        </div>
      )}

      {/* Profile Settings Form */}
      <form id="settings-form" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.sectionTitle}>
          <h3>Profile Settings</h3>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <InputField
              label="Full Name"
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              defaultValue={formData.full_name}
              onChange={handleInputChange}
              required
              error={errors.full_name}
            />
          </div>

          <div className={styles.formGroup}>
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              defaultValue={formData.email}
              onChange={handleInputChange}
              required
              error={errors.email}
            />
          </div>

          <div className={styles.formGroup}>
            <InputField
              label="Address"
              type="text"
              name="address"
              placeholder="Enter your address"
              defaultValue={formData.address}
              onChange={handleInputChange}
              error={errors.address}
            />
          </div>

          <div className={styles.formGroup}>
            <InputField
              label="Phone Number"
              type="tel"
              name="mobile_no"
              placeholder="Enter your phone number"
              defaultValue={formData.mobile_no}
              onChange={handleInputChange}
              required
              error={errors.mobile_no}
            />
          </div>

          <div className={styles.formGroup}>
            <InputField
              label="Age"
              type="number"
              name="age"
              placeholder="Enter your age"
              defaultValue={formData.age}
              onChange={handleInputChange}
              min={1}
              max={120}
              error={errors.age}
            />
          </div>

          <div className={styles.formGroup}>
            <InputField
              label="Institution"
              type="text"
              name="institution"
              placeholder="Enter your institution"
              defaultValue={formData.institution}
              onChange={handleInputChange}
              error={errors.institution}
            />
          </div>

          <div className={styles.formGroupFull}>
            <InputField
              label="Change Password"
              type="password"
              name="password"
              placeholder="Enter new password (leave blank to keep current)"
              defaultValue=""
              onChange={handleInputChange}
              error={errors.password}
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className={styles.sectionTitle}>
          <h3>Notification Preferences</h3>
        </div>

        <div className={styles.notificationGrid}>
          <div className={styles.notificationItem}>
            <InputField
              label="Email Notifications"
              type="checkbox"
              name="email_notifications"
              defaultChecked={notifications.email}
              onChange={() => handleNotificationChange("email")}
            />
          </div>

          <div className={styles.notificationItem}>
            <InputField
              label="Push Notifications"
              type="checkbox"
              name="push_notifications"
              defaultChecked={notifications.push}
              onChange={() => handleNotificationChange("push")}
            />
          </div>

          <div className={styles.notificationItem}>
            <InputField
              label="SMS Notifications"
              type="checkbox"
              name="sms_notifications"
              defaultChecked={notifications.sms}
              onChange={() => handleNotificationChange("sms")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}