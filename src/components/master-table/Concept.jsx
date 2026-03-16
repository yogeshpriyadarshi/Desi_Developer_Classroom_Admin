import { useEffect, useState } from "react";
import axios from "axios";

function Concept() {
  const [topicId, setTopicId] = useState("");
  const [topics, setTopics] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [conceptName, setConceptName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const addConcept = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/concepts/create`, {
        topicId: topicId,
        conceptName: conceptName,
        description: description,
      });
      console.log(response.data);
      setLoading(false);
      setConceptName("");
      setDescription("");
      setTopicId("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/topics/fetch-all`);
        setTopics(response.data.topics);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchConcepts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/concepts/fetch-by-topic/${topicId}`,
        );
        setConcepts(response.data.concepts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (topicId) {
      fetchConcepts();
    }
  }, [topicId]);

  return (
    <>
      <h1 className="text-2xl text-red-500 font-bold mb-4 text-center">
        Concept
      </h1>
      <div className="flex flex-row justify-around items-center min-h-screen border border-gray-300 rounded px-2 py-1">
        <div className="flex flex-col gap-10">
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
          >
            <option value="">Select Topic</option>
            {topics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                <span className="font-semibold">{topic.name}</span>{" "}
                <span className="text-gray-500">({topic.description})</span>
              </option>
            ))}
          </select>

          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Concept"
            value={conceptName}
            onChange={(e) => setConceptName(e.target.value)}
          />

          <textarea
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="border border-gray-300 bg-blue-500 text-white rounded px-2 py-1"
            onClick={addConcept}
          >
            Add Concept
          </button>
        </div>
        <div>
          {loading ? (
            <p className="text-2xl text-red-500 font-bold mb-4">Loading...</p>
          ) : (
            <ul className="border border-gray-300 rounded px-2 py-1 mt-5">
              <h1 className="text-2xl text-red-500 font-bold mb-4 text-center">
                List of Concepts
              </h1>
              {concepts.map((concept) => (
                <li key={concept._id}>
                  <span className="font-semibold">{concept.conceptName}</span>{" "}
                  <span className="text-gray-500">({concept.description})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Concept;
