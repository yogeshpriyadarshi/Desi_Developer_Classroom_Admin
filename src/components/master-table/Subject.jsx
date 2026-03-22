import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

function Subject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/subjects");
      setSubjects(response.data.subjects);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubmit = async () => {
    if (!name) {
      toast.warning("Subject name is required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await axiosInstance.put(`/subjects/${editId}`, {
          name,
          description,
        });
        toast.success("Subject updated successfully");
      } else {
        await axiosInstance.post("/subjects/create", {
          name,
          description,
        });
        toast.success("Subject added successfully");
      }
      resetForm();
      fetchSubjects();
    } catch (error) {
      console.log(error);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject) => {
    setName(subject.name);
    setDescription(subject.description);
    setEditId(subject._id);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-10">
        Subject Master
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {editId ? "Edit Subject" : "Add Subject"}
          </h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Subject Name"
              className="border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="border rounded p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {editId ? "Update Subject" : "Add Subject"}
            </button>

            {editId && (
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white p-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Subject List */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">
            List of Subjects
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-4">
              {subjects.map((subject) => (
                <li
                  key={subject._id}
                  className="border rounded p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-lg">{subject.name}</p>
                    <p className="text-gray-500 text-sm">
                      {subject.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEdit(subject)}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
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

export default Subject;
