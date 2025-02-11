import { useState, useEffect, useContext } from "react";
import { fetchJobs } from "../JobApi";
import { SearchContext } from "../contexts/SearchContext";
import { ThemeContext } from "../contexts/ThemeContext";
import JobCard from "./JobCard"; 

const JobList = () => {
  const { darkMode } = useContext(ThemeContext);
  const { searchTerm } = useContext(SearchContext);
  const [jobs, setJobs] = useState([]);
  const [companyFilter, setCompanyFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const getJobs = async () => {
      const jobData = await fetchJobs();
      setJobs(jobData);
      setLoading(false);
    };
    getJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (companyFilter === "" || job.company === companyFilter)
    );
  });

 const companies =  [...new Set(jobs.map((job) => job.company))];

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => {
    if (indexOfLastJob < filteredJobs.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading jobs...</p>;
  }

  return (
    <div className={`${darkMode ? "text-white bg-gray-900" : "text-gray-900 bg-gray-100"} min-h-screen flex flex-col items-center px-4 md:px-10 py-6`}>
      
      <div className="w-full max-w-4xl mb-6">
        <label className="block mb-2 font-semibold">Filter by Company:</label>
        <select
          className="p-2 border rounded-lg w-full md:w-1/2 bg-white text-gray-800 focus:outline-none shadow"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="">All Companies</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

     
      <div className="w-full max-w-5xl grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">No jobs found.</p>
        )}
      </div>

      

      <div className="fixed bottom-4 bg-white p-2 shadow-lg rounded-full flex gap-3">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full transition ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastJob >= filteredJobs.length}
          className={`px-4 py-2 rounded-full transition ${
            indexOfLastJob >= filteredJobs.length ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobList;
