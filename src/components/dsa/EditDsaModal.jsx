import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import RichTextEditor from "../../utils/RichTextEditor";

function EditDsaModal({ selectedDsa, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    explanation: "",
    difficulty: "",
    source: "",
    sourceLink: "",
    status: "active",
  });

  useEffect(() => {
    if (selectedDsa) {
      setFormData(selectedDsa);
    }
  }, [selectedDsa]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/dsa/${selectedDsa._id}`, formData);
      onUpdate(); // refresh list
      onClose(); // close modal
    } catch (err) {
      console.log(err);
    }
  };

  if (!selectedDsa) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-3xl p-6 rounded-xl flex flex-col gap-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold">Edit DSA</h2>

        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border px-3 py-2 rounded"
        />

        {/* Difficulty */}
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Source */}
        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Source</option>
          <option value="geeksforgeeks">GeeksforGeeks</option>
          <option value="leetcode">LeetCode</option>
          <option value="hackerrank">HackerRank</option>
        </select>

        {/* Source Link */}
        <input
          name="sourceLink"
          value={formData.sourceLink}
          onChange={handleChange}
          placeholder="Source Link"
          className="border px-3 py-2 rounded"
        />

        {/* Question */}
        <div>
          <label className="font-medium">Question</label>
          <RichTextEditor
            key={formData.question}
            value={formData.question}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                question: val,
              }))
            }
          />
        </div>

        {/* <RichTextEditor
          key={interview.question}
          className="w-full border rounded-lg p-2"
          value={interview.question}
          onChange={(value) =>
            setInterview((prev) => ({
              ...prev,
              question: value,
            }))
          }
        /> */}

        {/* Explanation */}
        <div>
          <label className="font-medium">Explanation</label>
          <RichTextEditor
            key={formData.explanation}
            value={formData.explanation}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                explanation: val,
              }))
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDsaModal;
