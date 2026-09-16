import React, { useEffect, useState } from 'react'
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
import {
  clearError,
  setError,
  setLoading,
  setUser
} from '@/redux/authSlice'
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
  const dispatch = useDispatch();

  const { loading, user } = useSelector(store => store.auth);

  // Handle text input
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // Handle profile image
  const changeFileHandler = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      toast.error(
        `File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Max size: 10MB`
      );
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please upload a valid image file (JPG, PNG, WEBP)"
      );
      return;
    }

    setInput({
      ...input,
      file
    });

    toast.success("Image selected successfully");
  };

  // Handle signup
  const submitHandler = async (e) => {

    e.preventDefault();

    // Full name validation
    if (!input.fullname.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    // Email validation
    if (!input.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(input.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation
    if (!input.phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    // Password validation
    if (!input.password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    if (input.password.length < 6) {
      toast.error(
        "Password must be at least 6 characters long"
      );
      return;
    }

    // Role validation
    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    // Create multipart form data
    const formData = new FormData();

    formData.append("fullname", input.fullname.trim());
    formData.append("email", input.email.trim());
    formData.append("phoneNumber", input.phoneNumber.trim());
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
          withCredentials: true
        }
      );

      if (res.data.success) {

        // Backend should return the newly registered user
        if (res.data.user) {
          dispatch(setUser(res.data.user));

          toast.success(res.data.message);

          // Go directly to dashboard
          navigate("/");
        } else {
          // Temporary fallback until backend registration
          // returns user + authentication cookie
          toast.success(res.data.message);
          navigate("/login");
        }
      }

    } catch (error) {

      console.error("Signup error:", error);

      const errorMsg =
        error.response?.data?.message ||
        "Registration failed";

      dispatch(setError(errorMsg));
      toast.error(errorMsg);

    } finally {
      dispatch(setLoading(false));
    }
  };

  // Already logged-in users should not access signup
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">
            Sign Up
          </h1>

          {/* Full Name */}

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Write your name"
            />
          </div>

          {/* Email */}

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
            />
          </div>

          {/* Phone Number */}

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91-"
            />
          </div>

          {/* Password */}

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create new password"
            />
          </div>

          {/* Role + Profile */}

          <div className="flex items-center justify-between">
            <RadioGroup
              className="flex items-center gap-4 my-5"
              value={input.role}
              onValueChange={(value) =>
                setInput({
                  ...input,
                  role: value
                })
              }
            >
              <div className="flex items-center space-x-2">

                <RadioGroupItem
                  value="student"
                  id="student"
                />

                <Label
                  htmlFor="student"
                  className="cursor-pointer"
                >
                  Student
                </Label>

              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                />

                <Label
                  htmlFor="recruiter"
                  className="cursor-pointer"
                >
                  Recruiter
                </Label>

              </div>

            </RadioGroup>

            {/* Profile Image */}

            <div className="flex items-center gap-2">

              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />

            </div>
          </div>

          {/* Signup Button */}
          {
            loading ? (
              <Button
                type="button"
                disabled
                className="w-full my-4"
              >
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                />
                Please Wait
              </Button>

            ) : (

              <Button
                type="submit"
                className="w-full my-4"
              >
                Signup
              </Button>
            )
          }

          <span className="text-sm">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;