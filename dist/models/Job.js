"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    company: {
        type: String,
        required: [true, "Please provide company"],
        maxlength: 20,
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    jobType: {
        type: String,
        enum: ["fulltime", "partime", "remote", "internship"],
        default: "fulltime",
    },
    jobLocation: {
        type: String,
        default: "my city",
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Job", JobSchema);
