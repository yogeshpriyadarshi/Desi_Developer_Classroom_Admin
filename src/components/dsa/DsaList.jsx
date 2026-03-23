import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import EditDsaModal from "./EditDsaModal";

function DsaList() {
  const [subjectId, setSubjectId] = useState("");
  const [subject, setSubject] = useState([]);
  const [topics, setTopics] = useState([]);
  const [dsaList, setDsaList] = useState([]);
  const [topicId, setTopicId] = useState("");

  const [selectedDsa, setSelectedDsa] = useState(null);

  const [filters, setFilters] = useState({
    difficulty: "",
    status: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

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
    setTopics(response.data.topics);
  };

  useEffect(() => {
    getSubject();
  }, []);

  useEffect(() => {
    getTopic();
  }, [subjectId]);

  // ------------------ FETCH DSA ------------------
  const fetchDsa = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(
        `/dsa/fetch-by-topic/${topicId}?${query}`,
      );
      setDsaList(res.data.dsas);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (topicId) {
      fetchDsa();
    }
  }, [filters, topicId]);

  // ------------------ HANDLE FILTER CHANGE ------------------
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // ------------------ EDIT HANDLER ------------------
  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditData(item);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const updateDsa = async () => {
    try {
      await axiosInstance.put(`/dsa/${editingId}`, editData);
      setEditingId(null);
      fetchDsa();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">DSA List</h1>

        {/* ---------------- FILTERS ---------------- */}
        <div className="flex gap-4 flex-wrap">
          <select
            name="topicId"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Topics</option>
            {topics.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* ---------------- LIST ---------------- */}
        <div className="flex flex-col gap-4">
          {dsaList.map((item) => (
            <div
              key={item._id}
              className="border rounded p-4 flex flex-col gap-2"
            >
              {editingId === item._id ? (
                <>
                  <input
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  />

                  <select
                    name="difficulty"
                    value={editData.difficulty}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>

                  <select
                    name="status"
                    value={editData.status}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={updateDsa}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p>Difficulty: {item.difficulty}</p>
                  <p>Status: {item.status}</p>

                  <button
                    onClick={() => setSelectedDsa(item)}
                    className="mt-2 text-sm px-3 py-1 bg-purple-500 text-white rounded"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <EditDsaModal
        selectedDsa={selectedDsa}
        onClose={() => setSelectedDsa(null)}
        onUpdate={fetchDsa}
      />
    </>
  );
}

export default DsaList;
