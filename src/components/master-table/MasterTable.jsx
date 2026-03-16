import { Link } from "react-router-dom";

function MasterTable() {
  const tables = [
    { name: "Subject", path: "/master-table/subject" },
    { name: "Topic", path: "/master-table/topic" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-12">
        Master Table
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tables.map((table, index) => (
          <Link
            key={index}
            to={table.path}
            className="bg-white shadow-lg rounded-xl px-10 py-8 text-center 
                       text-2xl font-semibold text-blue-600 
                       hover:bg-blue-500 hover:text-white 
                       transform hover:scale-105 transition duration-300"
          >
            {table.name}
          </Link>
        ))}
      </div>

      <Link
        to="/"
        className="mt-12 text-lg text-gray-700 hover:text-blue-500 underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default MasterTable;
