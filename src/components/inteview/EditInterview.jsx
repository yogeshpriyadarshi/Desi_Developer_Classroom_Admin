import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import RichTextEditor from "../../utils/RichTextEditor";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState({ question: "", explanation: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInterview = async () => {
      const res = await axiosInstance.get(`/interview/fetch/${id}`);
      setInterview(res.data.interview);
    };
    getInterview();
  }, [id]);

  // ✅ handle update
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axiosInstance.put(`/interview/update/${id}`, interview);
      navigate("/interview-list");
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Question */}
      <div>
        <label className="block text-sm font-medium mb-1">Question</label>
        <RichTextEditor
          key={interview.question}
          className="w-full border rounded-lg p-2"
          value={interview.question}
          onChange={(value) =>
            setInterview((prev) => ({
              ...prev,
              question: value,
            }))
          }
        />
      </div>

      {/* Explanation */}
      <RichTextEditor
        key={interview.explanation}
        className="w-full border rounded-lg p-2"
        value={interview.explanation || ""}
        onChange={(value) =>
          setInterview((prev) => ({
            ...prev,
            explanation: value,
          }))
        }
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}

export default EditInterview;
