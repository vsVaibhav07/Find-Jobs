import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const JobCard = ({ job }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`p-5 border rounded-lg shadow-lg transition-all transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-xl font-bold mb-1">{job.title}</h3>
      <p className="text-gray-400">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <button className="mt-3 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
