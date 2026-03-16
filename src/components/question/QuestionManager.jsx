import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

function QuestionManager() {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [status, setStatus] = useState("active");
  const [isPremium, setIsPremium] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const fetchSubjects = async () => {
    const res = await axiosInstance.get("/subjects/fetch-all");
    setSubjects(res.data.subjects);
  };

  const fetchTopics = async () => {
    const res = await axiosInstance.get(
      `/topics/fetch-by-subject/${subjectId}`,
    );
    setTopics(res.data.topics);
  };

  const fetchQuestions = async () => {
    try {
      const params = {
        status,
        difficulty,
      };

      if (isPremium !== "") {
        params.isPremium = isPremium;
      }

      const res = await axiosInstance.get(
        `/questions/fetch-by-topic/${topicId}`,
        { params },
      );

      setQuestions(res.data.questions);
    } catch (err) {
      toast.error("Failed to fetch questions");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjectId) fetchTopics();
  }, [subjectId]);

  useEffect(() => {
    if (topicId) fetchQuestions();
  }, [topicId, status, isPremium, difficulty]);

  const startEdit = (q) => {
    setEditId(q._id);
    setForm({
      questionText: q.questionText,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
      explanation: q.explanation,
      status: q.status,
      isPremium: q.isPremium,
    });
  };

  const updateOption = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const updateQuestion = async () => {
    try {
      await axiosInstance.put(`/questions/${editId}`, form);
      toast.success("Question updated");
      setEditId(null);
      fetchQuestions();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Question Manager
      </h1>

      {/* Filters */}
      <div className="bg-white shadow rounded p-6 grid md:grid-cols-2 gap-6 mb-8">
        <select
          className="border p-2 rounded"
          value={subjectId}
          onChange={(e) => {
            setSubjectId(e.target.value);
            setTopicId("");
            setQuestions([]);
          }}
        >
          <option value="">Select Subject</option>

          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
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
        <select
          className="border rounded p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          className="border rounded p-2"
          value={isPremium}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") setIsPremium("");
            else setIsPremium(value === "true");
          }}
        >
          <option value="">All</option>
          <option value="true">Premium</option>
          <option value="false">Non-Premium</option>
        </select>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q._id} className="bg-white shadow rounded p-6">
            {editId === q._id ? (
              <div className="space-y-4">
                <textarea
                  className="border p-2 rounded w-full"
                  value={form.questionText}
                  onChange={(e) =>
                    setForm({ ...form, questionText: e.target.value })
                  }
                />

                {/* Options */}
                {form.options.map((opt, i) => (
                  <input
                    key={i}
                    className="border p-2 rounded w-full"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                  />
                ))}

                {/* Correct Answer */}
                <select
                  className="border p-2 rounded"
                  value={form.correctAnswer}
                  onChange={(e) =>
                    setForm({ ...form, correctAnswer: Number(e.target.value) })
                  }
                >
                  <option value="">Select Answer</option>
                  <option value={0}>Option 1</option>
                  <option value={1}>Option 2</option>
                  <option value={2}>Option 3</option>
                  <option value={3}>Option 4</option>
                  <option value={4}>Option 5</option>
                </select>

                {/* Difficulty */}
                <select
                  className="border p-2 rounded"
                  value={form.difficulty}
                  onChange={(e) =>
                    setForm({ ...form, difficulty: e.target.value })
                  }
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                {/* Status */}
                <select
                  className="border p-2 rounded"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                {/* Premium */}
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={form.isPremium}
                    onChange={(e) =>
                      setForm({ ...form, isPremium: e.target.checked })
                    }
                  />
                  Premium Question
                </label>

                {/* Explanation */}
                <textarea
                  className="border p-2 rounded w-full"
                  value={form.explanation}
                  onChange={(e) =>
                    setForm({ ...form, explanation: e.target.value })
                  }
                />

                <div className="flex gap-3">
                  <button
                    onClick={updateQuestion}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-lg mb-2">{q.questionText}</h3>

                <ul className="list-disc ml-6 text-gray-700">
                  {q.options.map((o, i) => (
                    <li key={i}>
                      {o} {q.correctAnswer === i && "✅"}
                    </li>
                  ))}
                </ul>

                <p className="mt-2 text-sm text-gray-500">
                  Difficulty: {q.difficulty} | Status: {q.status}
                </p>

                <p className="text-sm mt-1">
                  Premium: {q.isPremium ? "Yes" : "No"}
                </p>

                <p className="text-gray-600 mt-2">
                  Explanation: {q.explanation}
                </p>

                <button
                  onClick={() => startEdit(q)}
                  className="mt-4 bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionManager;
