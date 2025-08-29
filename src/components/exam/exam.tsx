import styles from './style.module.css';
import Card from "@/components/card/view";  // Import the Card component

interface Exam {
  module_name: string;
  grade?: string; // Optional grade since we're generating it randomly
}

interface ExaminationResultsProps {
  exams: Exam[] | null; // Allow for null or undefined
}

const ExaminationResults: React.FC<ExaminationResultsProps> = ({ exams }) => {
  // Randomly generate exam results (A+, B, C, etc.)
  const generateRandomResult = () => {
    const results = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D'];
    return results[Math.floor(Math.random() * results.length)];
  };

  // Check if exams is an array, if not show a message
  if (!exams || !Array.isArray(exams)) {
    return (
      <div className={styles["examination-section"]}>
        <h2>Examination Results</h2>
        <div className={styles["no-exams"]}>
          <p>No examination data available. Please check back later.</p>
        </div>
      </div>
    );
  }

  // Check if the array is empty
  if (exams.length === 0) {
    return (
      <div className={styles["examination-section"]}>
        <h2>Examination Results</h2>
        <div className={styles["no-exams"]}>
          <p>You don't have any examination results yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["examination-section"]}>
      <h2>Examination Results</h2>
      <div className={styles["examination-list"]}>
        {exams.map((exam, index) => (
          <Card key={index} layout="row" gap="10px">
            <div className={styles["exam-module"]}>
              <strong>{exam.module_name}</strong>
            </div>
            <div className={styles["exam-grade"]}>
              <span>{exam.grade || generateRandomResult()}</span> {/* Use actual grade if available, otherwise generate random */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExaminationResults;