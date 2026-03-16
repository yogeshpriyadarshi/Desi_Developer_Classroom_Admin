import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function InActiveQuestion() {
  const [questions, setQuestions] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/questions/fetch-inActive`,
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  const checkAnswer = async (index, correctAnswer) => {
    if (index === correctAnswer) {
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
  };

  return (
    <div>
      <h3 className="text-2xl text-red-500 font-bold mb-4 text-center">
        InActive Question
      </h3>
      <div className="flex gap-10 flex-col p-10 border border-gray-300 rounded">
        {questions.map((question, number) => (
          <div key={question._id}>
            <p className="font-bold text-red-500">{question.difficulty}</p>
            <p>
              Question {number + 1} : {question.question}
            </p>
            <Link to={`/question/edit/${question._id}`}>
              <button className="bg-green-500 text-white px-2 py-1 rounded">
                Edit
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InActiveQuestion;
