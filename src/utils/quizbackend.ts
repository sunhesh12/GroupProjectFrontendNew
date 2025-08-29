export const fetchQuizAnswerIndex = async() =>{
    const res = await fetch(`http://localhost:8000/api/v1/quizzes/quizAnswerList`);
    if(!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
}


export const fetchQuizIndex = async() =>{
    const res = await fetch(`http://localhost:8000/api/v1/quizzes/quizList`);
    if(!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
}

export const fetchQuizQuestions = async(quizId: string) =>{
    const res = await fetch(`http://localhost:8000/api/v1/quizzes/quizzes`);
    if(!res.ok) throw new Error("Failed to fetch quiz questions");
    return res.json();
}

// export async function fetchAllQuizzes() {
//   try {
//     const res = await Fetch("http://localhost:8000/api/v1/quizzes/quizzes"); // adjust to your API route
//     return res.data; // assuming your backend returns { data: [...] }
//   } catch (error) {
//     console.error("Error fetching all quizzes:", error);
//     throw error;
//   }
// }