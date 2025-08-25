"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

// Questions data
const questions = [
  { topic: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { topic: "Which planet is known as the Red Planet?", options: ["text"], answer: "Mars" },
  { topic: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo"], answer: "Albert Einstein" },
  { topic: "What is the largest ocean on Earth?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: "Pacific" },
  { topic: "Which language is used to style web pages?", options: ["HTML", "CSS", "Python", "Java"], answer: "CSS" },
];

export default function Page() {
  const [flagged, setFlagged] = useState<number[]>([]);
  const [otherAnswers, setOtherAnswers] = useState<Record<number, string>>({});
  const [time, setTime] = useState<number>(10 * 60); // 10 minutes timer
  const [sidebarOpen, setSidebarOpen] = useState(true); // sidebar visibility
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFlag = (index: number) => {
    setFlagged(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleOtherInput = (value: string, qIndex: number) => {
    setOtherAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  const scrollToQuestion = (index: number) => {
    questionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={styles.pageWrapper}>
 

      {/* Questions Container */}
      <div className={styles.QuestionContainer}>
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            ref={el => (questionRefs.current[qIndex] = el)}
            className={`${styles.oneQuestionContainer} ${
              flagged.includes(qIndex) ? styles.flagged : ""
            }`}
          >
            <div className={styles.flagQuestion}>
              <p>Q{qIndex + 1}.</p>
              <button onClick={() => toggleFlag(qIndex)}>
                {flagged.includes(qIndex) ? "Unflag" : "Flag"}
              </button>
            </div>
            <div className={styles.oneQuestionWrapper}>
              <p>{q.topic}</p>
              <div className={styles.optionsContainer}>
                {q.options.map((option, index) => (
                  <div key={index} className={styles.optionBox}>
                    {option === "text" ? (
                      <input
                        type="text"
                        placeholder="Enter your answer"
                        value={otherAnswers[qIndex] || ""}
                        onChange={e => handleOtherInput(e.target.value, qIndex)}
                        className={styles.otherInput}
                      />
                    ) : (
                      <label>
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={option}
                        />{" "}
                        {option}
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

           {/* Fixed Timer at Top */}
      <div className={styles.timer}>{formatTime(time)}</div>

      {/* Sidebar Toggle Button */}
      <button
        className={styles.sidebarToggle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Hide" : "Show"} Questions
      </button>

      {/* Left Sidebar */}
      {sidebarOpen && (
        <div className={styles.sideNavBarContainer}>
          <div className={styles.sideNavBar}>
            {questions.map((_, index) => (
              <div
                key={index}
                className={`${styles.sideNavNumber} ${
                  flagged.includes(index) ? styles.flaggedNumber : ""
                }`}
                onClick={() => scrollToQuestion(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
