import express from "express";
import {register, login, updateProfile, logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router()

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout); // we use get because we don't need to pass any parameter(no cookies)
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;
