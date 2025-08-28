"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

export default function AddQuizQuestions() {
  const params = useParams();
  const moduleId = params?.moduleId; // will capture [moduleId] from your route

  const [questions, setQuestions] = useState([
    {
      question_number: "",
      question: "",
      question_type: "",
      answer: "",
      options: "",
    },
  ]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...questions];
    updated[index][e.target.name as keyof typeof updated[0]] = e.target.value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question_number: "", question: "", question_type: "", answer: "", options: "" },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      questions: questions.map((q) => ({
        quiz_id: 1, // change if dynamic
        question_number: parseInt(q.question_number),
        question: q.question,
        question_type: q.question_type,
        answer: q.answer,
        options: q.options
          ? q.options.split(",").map((opt) => opt.trim())
          : [],
      })),
    };

    console.log("Payload sending to backend:", JSON.stringify(payload, null, 2));

    try {
      const res = await fetch(`http://localhost:8000/api/v1/quiz/1/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add questions");

      alert("Questions added successfully!");
      setQuestions([{ question_number: "", question: "", question_type: "", answer: "", options: "" }]);
    } catch (err: any) {
      console.error("Error occurred:", err);
      alert(err.message);
    }
  };

  return (
    <div className="p-4">
      {/* Show Module Number */}
      <h1 className="text-2xl font-bold mb-4">Module {moduleId} - Add Quiz Questions</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <input
              type="number"
              name="question_number"
              placeholder="Question Number"
              value={q.question_number}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              name="question"
              placeholder="Question"
              value={q.question}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              name="question_type"
              placeholder="Question Type (e.g., single_answer, multiple_choice)"
              value={q.question_type}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              name="answer"
              placeholder="Answer"
              value={q.answer}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              name="options"
              placeholder="Options (comma-separated)"
              value={q.options}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 w-full rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Another Question
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit All Questions
        </button>
      </form>
    </div>
  );
}
