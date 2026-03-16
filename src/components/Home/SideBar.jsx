import { Link } from "react-router-dom";
import { FaBook, FaDumbbell, FaQuestionCircle, FaList } from "react-icons/fa";

function SideBar() {
  const sidebar = [
    { name: "master-table", icon: <FaBook /> },
    { name: "add-question", icon: <FaQuestionCircle /> },
    { name: "question-manager", icon: <FaList /> },
    { name: "questions/in-active", icon: <FaList /> },
  ];

  return (
    <div className="flex flex-col gap-3 w-48 p-4 bg-gray-100 h-screen">
      {sidebar.map((item) => (
        <Link
          key={item.name}
          to={`/${item.name}`}
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
