import express from "express";
import {postJob, getAllJobs, getAdminJobs, getJobById} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getAdmin/Jobs").get(isAuthenticated, getAdminJobs); // Fixed: was .post
router.route("/get/:id").get(getJobById); // Fixed: was .post

export default router;