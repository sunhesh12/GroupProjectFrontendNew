'use client'
import React from 'react'
import { useRouter, useParams } from "next/navigation";
import styles from './page.module.css'

import { fetchQuizQuestions } from '@/utils/quizbackend'

export default function page() {
    const [quizzes, setQuizzes] = React.useState<any[]>([]);
    const router = useRouter();
    const params = useParams();
    const module = params.moduleId;

    const handleClick = (quizId: string) => {
        // Implement your logic here, e.g., navigate to quiz edit page
        console.log("Quiz clicked:", quizId);
        console.log("Module ID:", module);
        if (!module) return;
        router.push(`/app/modules/${module}/quiz/quizedit/${quizId}`);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchQuizQuestions("yourQuizIdHere");
                setQuizzes(data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchData();
    }, []);


  return (
  <div className={styles.container}>
      <h1 className={styles.title}>Quiz List</h1>
      <ul className={styles.quizList}>
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className={styles.quizItem}
            onClick={() => handleClick(quiz.id)}
          >
            <h2 className={styles.quizTitle}>{quiz.title}</h2>
            <p className={styles.quizDescription}>{quiz.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

