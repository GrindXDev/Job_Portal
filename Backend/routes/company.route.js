import express from "express";
import {registerCompany, getCompany, getCompanyById, updateCompany} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router()

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById); // we use get because we don't need to pass any parameter(no cookies)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;
