import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import RichTextEditor from "../../utils/RichTextEditor";

function AddQuestion() {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);

  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [explanation, setExplanation] = useState("");

  const fetchSubjects = async () => {
    try {
      const res = await axiosInstance.get("/subjects");
      setSubjects(res.data.subjects);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await axiosInstance.get(
        `/topics/fetch-by-subject/${subjectId}`,
      );
      setTopics(res.data.topics);
    } catch {
      toast.error("Failed to load topics");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjectId) fetchTopics();
  }, [subjectId]);

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddQuestion = async () => {
    try {
      const res = await axiosInstance.post("/questions/create", {
        topic: topicId,
        question,
        options,
        correctAnswer,
        difficulty,
        explanation,
      });
      console.log(res.data);
      if (res.data.success) {
        toast.success("Question added successfully");

        setQuestion("");
        setOptions(["", "", "", "", ""]);
        setCorrectAnswer("");
        setExplanation("");
      } else {
        toast.error("Question not saved");
      }
    } catch {
      toast.error("Error adding question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-10">
        Add Question
      </h1>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8">
        {/* Subject / Topic / Difficulty */}
        <div className="grid md:grid-cols-3 gap-6">
          <select
            className="border rounded p-2"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Select Subject</option>

            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-2"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
          >
            <option value="">Select Topic</option>

            {topics.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-2"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Question */}
        <RichTextEditor
          placeholder="Enter Question"
          className="w-full border rounded p-3"
          value={question}
          onChange={(value) => setQuestion(value)}
        />

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-4">
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              className="border rounded p-2"
              value={opt}
              onChange={(e) => updateOption(index, e.target.value)}
            />
          ))}
        </div>

        {/* Correct Answer */}
        <select
          className="border rounded p-2"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="">Select Correct Answer</option>
          <option value="0">Option 1</option>
          <option value="1">Option 2</option>
          <option value="2">Option 3</option>
          <option value="3">Option 4</option>
          <option value="4">Option 5</option>
        </select>

        {/* Explanation */}
        <RichTextEditor
          value={explanation}
          onChange={(value) => setExplanation(value)}
        />

        {/* Button */}
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded cursor-pointer"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}

export default AddQuestion;
