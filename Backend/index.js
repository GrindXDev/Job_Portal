import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});
const app = express();

const _dirname = path.resolve();

// cors configuration
const corsOptions = {
    origin:["http://localhost:5173", "https://job-portal-9iiv.onrender.com"],
    credentials:true
}
app.use(cors(corsOptions));


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// Api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/Frontend/dist")));

app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, ()=>{
    connectDB();
    console.log(`server running at port ${PORT}`);
});






