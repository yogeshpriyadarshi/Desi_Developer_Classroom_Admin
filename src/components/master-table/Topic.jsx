import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

function Topic() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [topics, setTopics] = useState([]);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get("/subjects");
      setSubjects(response.data.subjects);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  const fetchTopics = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/topics/fetch-by-subject/${id}`,
      );
      setTopics(response.data.topics);
    } catch (error) {
      toast.error("Failed to fetch topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjectId) {
      fetchTopics(subjectId);
    }
  }, [subjectId]);

  const handleSubmit = async () => {
    if (!topic || !subjectId) {
      toast.warning("Subject and Topic are required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await axiosInstance.put(`/topics/${editId}`, {
          name: topic,
          subject: subjectId,
          description,
          slug,
        });

        toast.success("Topic updated successfully");
      } else {
        await axiosInstance.post("/topics/create", {
          name: topic,
          subject: subjectId,
          description,
          slug,
        });

        toast.success("Topic added successfully");
      }

      resetForm();
      fetchTopics(subjectId);
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (topic) => {
    setTopic(topic.name);
    setDescription(topic.description);
    setEditId(topic._id);
  };

  const resetForm = () => {
    setTopic("");
    setDescription("");
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-10">
        Topic Master
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* FORM */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {editId ? "Edit Topic" : "Add Topic"}
          </h2>

          <div className="flex flex-col gap-4">
            <select
              className="border rounded p-2"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select Subject</option>

              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Topic Name"
              className="border rounded p-2"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <input
              type="text"
              placeholder="Slug"
              className="border rounded p-2"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="border rounded p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
            >
              {editId ? "Update Topic" : "Add Topic"}
            </button>

            {editId && (
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white p-2 rounded cursor-pointer hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* TOPIC LIST */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">
            List of Topics
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : topics.length === 0 ? (
            <p className="text-center text-gray-400">No topics found</p>
          ) : (
            <ul className="space-y-4">
              {topics.map((topic) => (
                <li
                  key={topic._id}
                  className="border rounded p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-lg">{topic.name}</p>

                    <p className="text-gray-500 text-sm">{topic.description}</p>
                  </div>

                  <button
                    onClick={() => handleEdit(topic)}
                    className="bg-yellow-400 px-3 py-1 rounded cursor-pointer hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topic;
