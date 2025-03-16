import React from "react";
import style from "./page.module.css";

interface SemesterSelectorProps {
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  semesters: string[];
}

const SemesterSelector: React.FC<SemesterSelectorProps> = ({
  selectedSemester,
  setSelectedSemester,
  semesters,
}) => {
  // Sort semesters in ascending order
  const sortedSemesters = [...semesters].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return (
    <div className={style.semesterSelector}>
      <select
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(e.target.value)}
      >
        <option value="">Select Semester</option>
        {sortedSemesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SemesterSelector;
