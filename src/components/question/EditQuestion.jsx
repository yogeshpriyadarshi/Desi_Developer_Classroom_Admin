import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FetchMasterTable from "../master-table/FetchMasterTable";
import ToggleQuestionStatus from "./ToggleQuestionStatus";

function EditQuestion() {
  const { id } = useParams();
  const [concepts, setConcepts] = useState([]);
  const [question, setQuestion] = useState({
    conceptId: [],
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    difficulty: "",
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get(`${BASE_URL}/questions/${id}`);
      setQuestion(response.data.question);
    };
    fetchQuestion();
  }, []);

  const handleUpdateQuestion = async () => {
    try {
      const uniqueConceptId = [...new Set(question.conceptId)];
      const response = await axios.put(`${BASE_URL}/questions/${id}/update`, {
        ...question,
        conceptId: uniqueConceptId,
      });

      console.log(response.data.question);
      setQuestion(response.data.question);
    } catch (error) {
      console.log(error);
    }
  };
  const addConcepts = (concept) => {
    setConcepts([...concepts, concept]);
    setQuestion({
      ...question,
      conceptId: [...question.conceptId, concept._id],
    });
  };
  const removeConcepts = (concept) => {
    setConcepts(concepts.filter((id) => id !== concept));
    setQuestion({
      ...question,
      conceptId: question.conceptId.filter((id) => id !== concept._id),
    });
  };
  return (
    <>
      <h1 className="font-bold text-5xl text-red-500 text-center">
        Edit Question
      </h1>
      <div className="flex min-h-screen">
        <div className="flex-1/3 flex  gap-10 flex-col p-10">
          <FetchMasterTable
            addConcepts={addConcepts}
            removeConcepts={removeConcepts}
          />
          <div>
            <p> new concept added</p>
            {concepts.map((concept) => {
              return (
                <>
                  <ul>{concept.conceptName}</ul>
                </>
              );
            })}
          </div>
          <div>
            <p className="font-bold text-red-500"> List of concepts</p>
            <li>
              {question.conceptId.map((concept) => {
                return (
                  <>
                    <ul>{concept.conceptName}</ul>
                  </>
                );
              })}
            </li>
          </div>
          <div>
            <span className="m-2">Difficulty: </span>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={question.difficulty}
              onChange={(e) =>
                setQuestion({ ...question, difficulty: e.target.value })
              }
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="flex-2/3 flex gap-10 flex-col p-10">
          <textarea
            placeholder="Question"
            className="border border-gray-300 rounded px-2 py-1"
            value={question.question}
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Option 1"
            className="border border-gray-300 rounded px-2 py-1"
            value={question.options[0]}
            onChange={(e) =>
              setQuestion({
                ...question,
                options: [
                  e.target.value,
                  question.options[1],
                  question.options[2],
                  question.options[3],
                ],
              })
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Option 2"
            value={question.options[1]}
            onChange={(e) =>
              setQuestion({
                ...question,
                options: [
                  question.options[0],
                  e.target.value,
                  question.options[2],
                  question.options[3],
                ],
              })
            }
          />
          <input
            type="text"
            placeholder="Option 3"
            className="border border-gray-300 rounded px-2 py-1"
            value={question.options[2]}
            onChange={(e) =>
              setQuestion({
                ...question,
                options: [
                  question.options[0],
                  question.options[1],
                  e.target.value,
                  question.options[3],
                ],
              })
            }
          />
          <input
            type="text"
            placeholder="Option 4"
            className="border border-gray-300 rounded px-2 py-1"
            value={question.options[3]}
            onChange={(e) =>
              setQuestion({
                ...question,
                options: [
                  question.options[0],
                  question.options[1],
                  question.options[2],
                  e.target.value,
                ],
              })
            }
          />

          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={question.correctAnswer}
            onChange={(e) =>
              setQuestion({ ...question, correctAnswer: e.target.value })
            }
          >
            <option value="">Select Answer</option>
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
          </select>
          <textarea
            placeholder="Explanation"
            className="border border-gray-300 rounded px-2 py-1"
            value={question.explanation}
            onChange={(e) =>
              setQuestion({ ...question, explanation: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={handleUpdateQuestion}
          >
            Edit Question
          </button>
        </div>
        <div>
          <ToggleQuestionStatus questionId={question._id} />
        </div>
      </div>
    </>
  );
}

export default EditQuestion;
