import React from "react";
import style from "./page.module.css";

interface EnrollmentModalProps {
  selectedCourse: any;
  enrollmentKey: string;
  setEnrollmentKey: React.Dispatch<React.SetStateAction<string>>;
  handleEnrollmentKeySubmit: () => void;
  error: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  selectedCourse,
  enrollmentKey,
  setEnrollmentKey,
  handleEnrollmentKeySubmit,
  error,
  setIsModalOpen,
}) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <span className={style.closeIcon} onClick={() => setIsModalOpen(false)}>
          X
        </span>
        <h2>{selectedCourse.name}</h2>
        <br />
        <h3>Enter Enrollment Key:</h3>
        <input
          type="text"
          placeholder="Enrollment Key"
          value={enrollmentKey}
          onChange={(e) => setEnrollmentKey(e.target.value)}
        />
        <button onClick={handleEnrollmentKeySubmit}>Enroll me</button>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
};

export default EnrollmentModal;
