import axios from "axios";


const ApiUrl= "https://jsonfakery.com/jobs";

export const fetchJobs=async()=>{
    try {
        const response=await axios.get(ApiUrl);
        return response.data;
    } catch (error) {
        console.error("Error in fetching Data");
        return [];
    }
}