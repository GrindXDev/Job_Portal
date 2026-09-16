import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/data_uri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const {
            fullname,
            email,
            phoneNumber,
            password,
            role
        } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Check existing user BEFORE uploading image
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        // Profile image upload
        const file = req.file;
        let cloudResponse;

        if (file) {
            const fileUri = getDataUri(file);

            cloudResponse = await cloudinary.uploader.upload(
                fileUri.content
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const createdUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,

            profile: {
                profilePhoto: cloudResponse?.secure_url || ""
            }
        });

        // Create JWT immediately after signup
        const tokenData = {
            userId: createdUser._id
        };

        const token = jwt.sign(
            tokenData,
            process.env.SECRET_KEY,
            {
                expiresIn: "1d"
            }
        );

        // Don't return password to frontend
        const user = {
            _id: createdUser._id,
            fullname: createdUser.fullname,
            email: createdUser.email,
            phoneNumber: createdUser.phoneNumber,
            role: createdUser.role,
            profile: createdUser.profile
        };

        // Set cookie + return user
        return res
            .status(201)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .json({
                message: "Account created successfully.",
                user,
                success: true
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error during registration",
            success: false,
            error: error.message
        });
    }
};

export const login = async (req, res) => {

    try {
        const {
            email,
            password,
            role
        } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required.",
                success: false
            });
        }


        // Find user
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Check role
        if (role !== foundUser.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        }

        // JWT
        const tokenData = {
            userId: foundUser._id
        };

        const token = jwt.sign(
            tokenData,
            process.env.SECRET_KEY,
            {
                expiresIn: "1d"
            }
        );

        // Safe user object
        const user = {
            _id: foundUser._id,
            fullname: foundUser.fullname,
            email: foundUser.email,
            phoneNumber: foundUser.phoneNumber,
            role: foundUser.role,
            profile: foundUser.profile
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,

                // Required because frontend and backend
                // are on different HTTPS domains
                secure: true,
                sameSite: "none"
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true

            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error during login",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .json({
                message: "Logged out successfully.",
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error during logout",
            success: false,
            error: error.message
        });
    }
};