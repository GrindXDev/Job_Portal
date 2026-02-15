import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            if(!companyId)  return;

            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials: true});
                console.log(res.data.company);

                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
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
        fetchSingleCompany();
    },[companyId, dispatch]);
    
    return null;
};

export default useGetCompanyById
