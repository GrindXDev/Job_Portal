import {Job} from "../models/job.model.js";


export const postJob = async (req,res) => {
    try{
        const {title, description, salary, location, requirements, position, jobType, experience, companyId} = req.body;
        const userId = req.id;

        // Debug: Log what you're receiving
        console.log("Request body:", req.body);
        console.log("User ID:", userId);

        // Check which fields are missing
        const missingFields = [];
        if(!title) missingFields.push("title");
        if(!description) missingFields.push("description");
        if(!salary) missingFields.push("salary");
        if(!location) missingFields.push("location");
        if(!requirements) missingFields.push("requirements");
        if(!position) missingFields.push("position");
        if(!jobType) missingFields.push("jobType");
        if(!experience) missingFields.push("experience");
        if(!companyId) missingFields.push("companyId");

        if(missingFields.length > 0){
            return res.status(400).json({
                message: "Something is missing.",
                missingFields: missingFields,  // This will show what's missing
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary : Number(salary),
            location,
            position,
            jobType,
            experienceLevel: experience,
            company: companyId,
            created_by : userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
            success: false
        })
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        // Always return 200
        return res.status(200).json({
            success: true,
            jobs: jobs   // empty array is OK
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const getJobById = async (req,res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found.",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

export const getAdminJobs = async (req,res) => {
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId})
            .populate({
                path: "company"
            })
            .sort({ createdAt: -1 });  // Sort goes HERE on the query!
        
        if(jobs.length === 0){
            return res.status(404).json({
                message:"Jobs not found.",
                success: false
            });
            // NO .sort() here!
        };

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}