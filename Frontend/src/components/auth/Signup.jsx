import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, setError, setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector(store => store.auth)
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error(`File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Max size: 10MB`);
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPG, PNG, WEBP)");
        return;
      }

      setInput({ ...input, file });
      toast.success("Image selected successfully");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullname || !input.fullname.trim()) {
      toast.error("Enter your full name");
      return;
    }

    if (!input.email || !input.email.trim()) {
      toast.error("Enter your email");
      return;
    }

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isValidEmail(input.email)) {
      toast.error("Enter your valid email adress");
      return;
    }

    if (!input.phoneNumber || !input.phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!input.password || !input.password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    if (input.password.length < 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2  border  border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign UP</h1>
          <div className="my-2">
            <Label >Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Write your name"
            />
          </div>
          <div className="my-2">
            <Label >Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label >Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91-"
            />
          </div>
          <div className="my-2">
            <Label >Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create new password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              className="flex items-center gap-4 my-5"
              value={input.role}
              onValueChange={(value) =>
                setInput({ ...input, role: value })
              }
            >
              <div className="flex items-center space-x-2">

                <RadioGroupItem value="student" id="r1" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="r2" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-600">login</Link></span>
        </form>
      </div>
    </div>

  )
}

export default Signup