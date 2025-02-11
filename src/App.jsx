import { useContext } from "react";
import JobList from "./components/JobList"
import Navbar from "./components/Navbar"
import { SearchProvider } from "./contexts/SearchContext"
import {ThemeContext} from "./contexts/ThemeContext"



function App() {
   const {darkMode} = useContext(ThemeContext);
  return (
   <>
   
   <SearchProvider>
   <div className={`${darkMode?"bg-slate-400 text-white":""}  w-screen h-screen overflowx-hidden`}>
    <Navbar/>
    <JobList/>
   
   </div>
  
   </SearchProvider>
  
  
   </>
  )
}

export default App
