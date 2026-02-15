import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const{searchedQuery} = useSelector(store=>store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {withCredentials: true});
                if(res.data?.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                console.error("Error fetching jobs:");
                console.error("Status:", error.response?.status);
                console.error("Message:", error.response?.data?.message);
                console.error("Data:", error.response?.data);
                console.error("Full error:", error);
            }

        }
        fetchAllJobs();
    },[searchedQuery, dispatch]);
    
    return null;
};

export default useGetAllJobs