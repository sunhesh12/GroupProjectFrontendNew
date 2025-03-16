"use client";
// pages/quiz.js
import { useState } from "react";
import { quizData } from "./data/questions";
import style from "./quiz.module.css";

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Function to handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Function to submit the quiz
  const handleSubmitQuiz = () => {
    let calculatedScore = 0;

    selectedOptions.forEach((option, index) => {
      if (option === quizData[index].answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowResult(true);
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptions([]);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Quiz</h1>

      {/* Show result if quiz is completed */}
      {showResult ? (
        <div className={style.resultContainer}>
          <h2 className={style.resultTitle}>Quiz Completed!</h2>
          <p className={style.resultText}>
            You scored {score} out of {quizData.length}.
          </p>
          <button className={`${style.button} ${style.restartButton}`} onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className={style.quizContainer}>
          {/* Current Question */}
          <h2 className={style.question}>
            Question {currentQuestion + 1}: {quizData[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-2">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`${style.optionButton} ${selectedOptions[currentQuestion] === index ? style.selectedOption : ""}`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className={style.navigation}>
            <button
              className={`${style.navButton} ${style.previousButton}`}
              onClick={() => setCurrentQuestion(Math.max(currentQuestion - 1, 0))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            {currentQuestion === quizData.length - 1 ? (
              <button className={`${style.navButton} ${style.submitButton}`} onClick={handleSubmitQuiz}>
                Submit
              </button>
            ) : (
              <button className={`${style.navButton} ${style.nextButton}`} onClick={handleNextQuestion}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
