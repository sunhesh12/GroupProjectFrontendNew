"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";

import {fetchQuizIndex} from "@/utils/quizbackend";
import { fetchQuizAnswerIndex } from "@/utils/quizbackend";

// Questions data
// const questions = [
//   {
//     topic: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     answer: "Paris",
//   },
  // {
  //   topic: "Which planet is known as the Red Planet?",
  //   options: ["text"],
  //   answer: "Mars",
  // },
  // {
  //   topic: "Who developed the theory of relativity?",
  //   options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo"],
  //   answer: "Albert Einstein",
  // },
  // {
  //   topic: "What is the largest ocean on Earth?",
  //   options: ["Atlantic", "Pacific", "Indian", "Arctic"],
  //   answer: "Pacific",
  // },
  // {
  //   topic: "Which language is used to style web pages?",
  //   options: ["HTML", "CSS", "Python", "Java"],
  //   answer: "CSS",
  // },
// ];

export default function Page() {
  const [answered, setAnswered] = useState<number[]>([]);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [otherAnswers, setOtherAnswers] = useState<Record<number, string>>({});
  const [time, setTime] = useState<number>(10 * 60); // 10 minutes timer
  const [sidebarOpen, setSidebarOpen] = useState(true); // sidebar visibility
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //if add answer quick access numbers wanna green

  const handleAnswer = (qIndex: number, value: string) => {
    // Update answered list if user selects something
    setAnswered((prev) => (prev.includes(qIndex) ? prev : [...prev, qIndex]));
  };
  //if set flag answer quick access numbers wanna red
  const toggleFlag = (index: number) => {
    setFlagged((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const scrollToQuestion = (index: number) => {
    questionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOtherInput = (value: string, qIndex: number) => {
    setOtherAnswers((prev) => ({ ...prev, [qIndex]: value }));
    if (value.trim().length > 0) {
      setAnswered((prev) => (prev.includes(qIndex) ? prev : [...prev, qIndex]));
    } else {
      // remove if cleared
      setAnswered((prev) => prev.filter((i) => i !== qIndex));
    }
  };

  const[quizAnswerList, setQuizAnswerList] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizAnswerIndex();
        setQuizAnswerList(data);
        console.log("Fetched quiz data:", data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);


  const[quizList, setQuizList] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizIndex();
        setQuizList(data);
        console.log("Fetched quiz data:", data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);


const questions = quizList.map((quiz) => ({
  topic: quiz.question_text,
  options: quizAnswerList
    .filter((answer) => answer.quizquestion_id === quiz.id)
    .map((answer) => answer.answer_text),
  answer: "Paris", // replace this with the correct answer if you store it
}));

  return (

    <div className={styles.pageWrapper}>

      {/* Questions Container */}
      <div className={styles.QuestionContainer}>
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            ref={(el) => (questionRefs.current[qIndex] = el)}
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
                        onChange={(e) =>
                          handleOtherInput(e.target.value, qIndex)
                        }
                        className={styles.otherInput}
                      />
                    ) : (
                      <label>
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={option}
                          onChange={() => handleAnswer(qIndex, option)}
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
        {/* Sidebar Toggle Button */}
        <button
          className={styles.sidebarToggle}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ right: sidebarOpen ? "210px" : "10px" }}
        >
          {sidebarOpen ? (
            <Image
              src="/icons/next.svg"
              alt="Collapse"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/icons/previous.svg"
              alt="Collapse"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>

      {/* Fixed Timer at Top */}
      <div className={styles.timer}>{formatTime(time)}</div>

      {/* Left Sidebar */}
      {sidebarOpen && (
        <div className={styles.sideNavBarContainer}>
          <div className={styles.sideNavBarInner}>
            <div className={styles.sideNavBar}>
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.sideNavNumber} 
                  ${answered.includes(index) ? styles.answeredNumber : ""}
                  ${flagged.includes(index) ? styles.flaggedNumber : ""} `}
                  onClick={() => scrollToQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
