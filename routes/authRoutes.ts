import express from "express";
import { register, login, updateUser } from "../controllers/authController";
import { authenticateUser } from "../middleware/auth";
import rateLimit from "express-rate-limit";

const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 request max per 15 mins
  message:
    "Too many request from this IP address, please try again after 15 minutes!",
  standardHeaders: true,
  legacyHeaders: true,
});

router.route("/register").post(limiter, register);
router.route("/login").post(limiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
