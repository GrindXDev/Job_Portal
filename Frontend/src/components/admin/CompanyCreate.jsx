// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch } from 'react-redux'
// import { setSingleCompany } from '@/redux/companySlice'

// const CompanyCreate = () => {
//     const navigate = useNavigate();
//     const [companyName, setCompanyName] = useState('');
//     const dispatch = useDispatch();

//     const registerNewCompany = async () => {
//         try {
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             if (res?.data?.success) {
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || 'Failed to create company');
//         }
//     }
//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto'>
//                 <div className='my-10'>
//                     <h1 className='font-bold text-2xl'>Your Company Name</h1>
//                     <p className='text-gray-500'>what would you like to give your company name?  you can change it later.</p>
//                 </div>

//                 <Label>Company Name</Label>
//                 <Input
//                     type='text'
//                     className='my-2'
//                     placeholder='JobHunt, MicroSoft etc.'
//                     onChange={(e) => setCompanyName(e.target.value)}
//                 />
//                 <div className='flex items-center my-10 gap-2'>
//                     <Button variant='outline' onClick={() => navigate("/admin/companies")}>Cancel</Button>
//                     <Button onClick={registerNewCompany}>Continue</Button>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default CompanyCreate
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            toast.error("Please login first");
            navigate('/login');
        }
    }, [user, navigate]);

    const registerNewCompany = async () => {
        // Validation
        if (!companyName || companyName.trim() === '') {
            toast.error('Please enter a company name');
            return;
        }

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                toast.error('Please login first');
                navigate('/login');
            } else {
                toast.error(error.response?.data?.message || 'Failed to create company');
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to name your company? You can change it later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type='text'
                    className='my-2'
                    placeholder='JobHunt, Microsoft etc.'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center my-10 gap-2'>
                    <Button variant='outline' onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}
export default CompanyCreate

