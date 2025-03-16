import React, { useState } from "react";
import styles from "./settings.module.css";

interface UserProfileProps {
  fullName: string;
  email: string;
  isEditable: boolean;
  setIsEditable: (value: boolean) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  fullName,
  email,
  isEditable,
  setIsEditable,
}) => {
  const [profilePic, setProfilePic] = useState("/profile-pic.jpg"); // Default profile picture

  // Handle file upload and update the profile picture
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string); // Set the uploaded image as profile picture
      };
      if (file) {
        reader.readAsDataURL(file); // Read the file
      }
    }
  };

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileOwner}>
        <div
          className={styles.profilePicWrapper}
          onClick={() => {
            if (isEditable) {
              document.getElementById("fileInput")?.click(); // Trigger file input click on image click
            }
          }}
        >
          <img
            src={profilePic}
            alt="Profile"
            className={styles.profilePic}
          />
        </div>
        {isEditable && (
          <div className={styles.uploadButton}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleProfilePicChange}
              className={styles.fileInput}
            />
          </div>
        )}
        <div className={styles.profileInfo}>
          <h2>{fullName}</h2>
          <p>{email}</p>
        </div>
      </div>
      <button
        className={styles.editButton}
        onClick={() => setIsEditable(!isEditable)}
      >
        {isEditable ? "Cancel" : "Edit"}
      </button>
    </div>
  );
};

export default UserProfile;
