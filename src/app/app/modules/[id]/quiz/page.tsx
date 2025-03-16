"use client";
// pages/quiz.js
import { useState, useEffect } from "react";
import { quizData } from "../data/questions";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Quiz</h1>

      {/* Show result if quiz is completed */}
      {showResult ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-lg">
            You scored {score} out of {quizData.length}.
          </p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={resetQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          {/* Current Question */}
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestion + 1}: {quizData[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-2">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full px-4 py-2 rounded ${
                  selectedOptions[currentQuestion] === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setCurrentQuestion(Math.max(currentQuestion - 1, 0))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            {currentQuestion === quizData.length - 1 ? (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSubmitQuiz}
              >
                Submit
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}