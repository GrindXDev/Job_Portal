import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    requirements:[{  // Fixed: was 'requirement'
        type: String
    }],
    salary:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Should this be 'User' instead of 'Company'?
        required: true
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }]
},{timestamps:true});

export const Job = mongoose.model('Job', jobSchema);

