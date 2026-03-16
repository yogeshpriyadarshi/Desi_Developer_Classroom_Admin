import axios from "axios";
import { useEffect, useState } from "react";

function FetchMasterTable({ addConcepts, removeConcepts }) {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [concepts, setConcepts] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get(`${BASE_URL}/subjects/fetch-all`);
      setSubjects(response.data.subjects);
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get(
        `${BASE_URL}/topics/fetch-by-subject/${subjectId}`,
      );
      setTopics(response.data.topics);
    };
    if (subjectId) fetchTopics();
  }, [subjectId]);

  useEffect(() => {
    const fetchConcepts = async () => {
      const response = await axios.get(
        `${BASE_URL}/concepts/fetch-by-topic/${topicId}`,
      );
      setConcepts(response.data.concepts);
    };
    if (topicId) fetchConcepts();
  }, [topicId]);

  return (
    <>
      <div className="border border-gray-300 rounded ">
        <h3 className="font-bold text-2xl text-red-500 text-center">
          Master Table
        </h3>
        <div className="border border-gray-300 rounded px-2 py-1 flex gap-10 flex-col">
          <select
            className="border border-gray-300 rounded px-2 py-1"
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectName}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded px-2 py-1"
            onChange={(e) => setTopicId(e.target.value)}
          >
            <option value="">Select Topic</option>
            {topics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.topicName}
              </option>
            ))}
          </select>

          {/* want to select multiple concept checkbox */}
          {concepts.map((concept) => (
            <div key={concept._id}>
              <input
                type="checkbox"
                id={concept._id}
                value={concept}
                onChange={(e) => {
                  if (e.target.checked) {
                    addConcepts(concept);
                  } else {
                    removeConcepts(concept);
                  }
                }}
              />
              <label htmlFor={concept._id}>{concept.conceptName}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FetchMasterTable;
