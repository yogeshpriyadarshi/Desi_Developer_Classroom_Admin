import { Link } from "react-router-dom";
import { FaBook, FaDumbbell, FaQuestionCircle, FaList } from "react-icons/fa";

function SideBar() {
  const sidebar = [
    { path: "master-table", name: "Master Table", icon: <FaBook /> },
    { path: "add-question", name: "Add Question", icon: <FaQuestionCircle /> },
    { path: "question-manager", name: "Question Manager", icon: <FaList /> },
    { path: "concept", name: "Concept", icon: <FaList /> },
    { path: "dsa", name: "DSA", icon: <FaDumbbell /> },
    { path: "interview", name: "Interview", icon: <FaDumbbell /> },
    { path: "dsa-list", name: "DSA List", icon: <FaList /> },
    { path: "interview-list", name: "Interview List", icon: <FaList /> },
  ];

  return (
    <div className="flex flex-col gap-3 w-48 p-4 bg-gray-100 h-screen">
      {sidebar.map((item) => (
        <Link
          key={item.name}
          to={`/${item.path}`}
          className="flex items-center gap-3 text-blue-500 text-lg border border-blue-500 p-2 rounded-md hover:bg-blue-50"
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
