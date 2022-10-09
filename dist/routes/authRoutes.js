"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = express_1.default.Router();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many request from this IP address, please try again after 15 minutes!",
    standardHeaders: true,
    legacyHeaders: true,
});
router.route("/register").post(limiter, authController_1.register);
router.route("/login").post(limiter, authController_1.login);
router.route("/updateUser").patch(auth_1.authenticateUser, authController_1.updateUser);
exports.default = router;
