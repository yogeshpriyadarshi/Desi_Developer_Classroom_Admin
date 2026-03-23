import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import RichTextEditor from "../../utils/RichTextEditor";

function DSA() {
  const [subject, setSubject] = useState([]);
  const [topic, setTopic] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [question, setQuestion] = useState();
  const [explanation, setExplanation] = useState();

  const [dsa, setDsa] = useState([]);

  const getSubject = async () => {
    const response = await axiosInstance.get("/subjects");
    setSubject(response.data.subjects);
    const subject = response.data.subjects.find((s) => s.name === "DSA");
    setSubjectId(subject._id);
  };

  const getTopic = async () => {
    const response = await axiosInstance.get(
      `/topics/fetch-by-subject/${subjectId}`,
    );
    setTopic(response.data.topics);
  };

  const getDsa = async () => {
    const response = await axiosInstance.get(`/dsa/${topicId}`);
    setDsa(response.data);
  };

  useEffect(() => {
    getSubject();
  }, []);

  useEffect(() => {
    if (subjectId) getTopic();
  }, [subjectId]);

  useEffect(() => {
    if (topicId) getDsa();
  }, [topicId]);

  const addDsa = async () => {
    const response = await axiosInstance.post("/dsa/", {
      topic: topicId,
      question,
      explanation,
    });
    setDsa(response.data);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">DSA</h1>
          {/* filter select topics */}
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
          >
            <option value="">All</option>
            {topic.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* add question */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Add Question</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="question">Question</label>
              <RichTextEditor
                value={question}
                onChange={(value) => setQuestion(value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="explanation">Explanation</label>
              <RichTextEditor
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={addDsa}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DSA;
