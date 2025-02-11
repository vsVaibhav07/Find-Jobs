import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { ThemeContext } from "../contexts/ThemeContext";
import ToggleButton from "./ToggleButton";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <nav className={`${darkMode ? "bg-slate-800" : "bg-blue-500"} shadow-md px-6 py-3 w-screen text-white overflow-hidden flex justify-between items-center`}>
      <h1 className="text-2xl font-bold">Jobs For You</h1>
      <input
        type="text"
        placeholder="Search by job title..."
        className="p-2 border-none rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ToggleButton />
    </nav>
  );
};

export default Navbar;
