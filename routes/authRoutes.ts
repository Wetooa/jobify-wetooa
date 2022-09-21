import { register, login, updateUser } from "../controllers/authController";

import express from "express";
import { appBarClasses } from "@mui/material";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(updateUser);

export default router;
