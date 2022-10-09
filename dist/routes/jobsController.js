"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jobsController_1 = require("../controllers/jobsController");
router.route("/").get(jobsController_1.getAllJobs).post(jobsController_1.createJob);
router.route("/stats").get(jobsController_1.showStats);
router.route("/:id").delete(jobsController_1.deleteJob).patch(jobsController_1.updateJob);
exports.default = router;
