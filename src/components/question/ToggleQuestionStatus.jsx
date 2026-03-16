import axios from "axios";
import { useEffect, useState } from "react";

function ToggleQuestionStatus({ questionId }) {
  const [question, setQuestion] = useState({});
  const BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchQuestion = async () => {
      console.log("fetch questin ", questionId);
      if (!questionId) return;
      const response = await axios.get(`${BASE_URL}/questions/${questionId}`);
      setQuestion(response.data.question);
    };
    if (questionId) {
      fetchQuestion();
    }
  }, [questionId]);

  return (
    <>
      <h1 className="font-bold text-5xl text-red-500 text-center">
        Status: {question.status}
      </h1>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded"
        onClick={() => {
          const updateQuestion = async () => {
            const response = await axios.patch(
              `${BASE_URL}/questions/${questionId}/toggle-status`,
            );
            console.log(response.data);
            setQuestion(response.data.question);
          };
          updateQuestion();
        }}
      >
        Change Status
      </button>
    </>
  );
}

export default ToggleQuestionStatus;
