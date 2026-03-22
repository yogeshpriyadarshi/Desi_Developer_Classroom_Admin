import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import RichTextEditor from "../../utils/RichTextEditor";

function ConceptForm() {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    description: "",
    content: "",
    status: "active",
    isPremium: false,
  });

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axiosInstance.get("/subjects");
        setSubjects(res.data.subjects);
      } catch (err) {
        toast.error("Failed to load subjects");
      }
    };
    fetchSubjects();
  }, []);

  // Fetch topics based on subject
  useEffect(() => {
    if (!selectedSubject) return;

    const fetchTopics = async () => {
      try {
        const res = await axiosInstance.get(
          `/topics/fetch-by-subject/${selectedSubject}`,
        );
        setTopics(res.data.topics);
      } catch (err) {
        toast.error("Failed to load topics");
      }
    };

    fetchTopics();
  }, [selectedSubject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.topic) {
      toast.error("Please select a topic");
      return;
    }

    try {
      await axiosInstance.post("/concepts/create", formData);

      toast.success("Concept saved successfully!");

      setFormData({
        name: "",
        topic: "",
        description: "",
        content: "",
        status: "active",
        isPremium: false,
      });

      setSelectedSubject("");
      setTopics([]);
    } catch (err) {
      console.error(err);
      toast.error("Error saving concept");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Concept</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
          {/* Topic */}
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            disabled={!selectedSubject}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          >
            <option value="">Select Topic</option>
            {topics.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Concept Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Content */}
          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {/* Premium */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPremium"
              checked={formData.isPremium}
              onChange={handleChange}
            />
            <span className="text-gray-700">Premium</span>
          </label>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Concept
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConceptForm;
