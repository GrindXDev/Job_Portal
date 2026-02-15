import { setAllAdminJobs} from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdmin/jobs`, {withCredentials: true});
                if(res.data?.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
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
        fetchAllAdminJobs();
    });
    
    return null;
};

export default useGetAllAdminJobs