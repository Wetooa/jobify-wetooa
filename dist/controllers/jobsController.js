"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = exports.deleteJob = exports.updateJob = exports.getAllJobs = exports.createJob = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const Job_1 = __importDefault(require("../models/Job"));
const checkPermissions_1 = require("../utils/checkPermissions");
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { position, company } = req.body;
    if (!position || !company) {
        throw new errors_1.BadRequestError("Provide all values!");
    }
    req.body.createdBy = req.body.user.userId;
    const job = yield Job_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
});
exports.createJob = createJob;
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, status, jobType, sort, page, limit } = req.query;
    const queryObject = {
        createdBy: req.body.user.userId,
        search: [
            { company: { $regex: "", $options: "i" } },
            { position: { $regex: "", $options: "i" } },
            { jobLocation: { $regex: "", $options: "i" } },
        ],
    };
    if (search) {
        queryObject.search = [
            { company: { $regex: search, $options: "i" } },
            { position: { $regex: search, $options: "i" } },
            { jobLocation: { $regex: search, $options: "i" } },
        ];
    }
    if (status && status !== "all") {
        queryObject.status = status;
    }
    if (jobType && jobType !== "all") {
        queryObject.jobType = jobType;
    }
    // ok smth is wrong here
    // ahhhhh ok i get it na thx john, so if u use await, its gonna give u the result na
    // if not, its gonna think of it as a query pa
    const { search: searchObject } = queryObject, query = __rest(queryObject, ["search"]);
    let result = Job_1.default.find({
        $and: [{ $or: searchObject }, query],
    });
    if (sort === "latest") {
        result = result.sort("-createdAt");
    }
    else if (sort === "oldest") {
        result = result.sort("createdAt");
    }
    else if (sort === null || sort === void 0 ? void 0 : sort.startsWith("a-z")) {
        result = result.sort(sort === null || sort === void 0 ? void 0 : sort.substring(4));
    }
    else {
        result = result.sort(`-${sort === null || sort === void 0 ? void 0 : sort.substring(4)}`);
    }
    // pagination
    const jobsLimit = limit || 10;
    const skip = (page - 1) * jobsLimit;
    result = result.skip(skip).limit(jobsLimit);
    const jobs = yield result;
    const totalJobs = yield Job_1.default.countDocuments({
        $and: [{ $or: searchObject }, query],
    });
    const numOfPages = Math.ceil(totalJobs / jobsLimit);
    res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
});
exports.getAllJobs = getAllJobs;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { user } = _a, editedJob = __rest(_a, ["user"]);
    const { id: jobId } = req.params;
    const { position, company } = editedJob;
    if (!position || !company) {
        return new errors_1.BadRequestError("Please provide all values!");
    }
    const job = yield Job_1.default.findOne({ _id: jobId });
    if (!job) {
        throw new errors_1.NotFound(`No job with id: ${jobId}`);
    }
    // check permissions part
    (0, checkPermissions_1.checkPermissions)(user.userId, job.createdBy);
    // alternative method is to use job.save() to use hooks like UserSchema.pre("save") and more
    // moreover, adding createdBy parameter also works, but you wont be able to have admins that can edit anyones job :)
    const updatedJob = yield Job_1.default.findOneAndUpdate({ _id: jobId }, editedJob, {
        new: true,
        runValidators: true,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const { id: jobId } = req.params;
    const job = yield Job_1.default.findOne({ _id: jobId });
    if (!job) {
        throw new errors_1.NotFound(`No job with id: ${jobId}`);
    }
    (0, checkPermissions_1.checkPermissions)(user.userId, job.createdBy);
    yield Job_1.default.findOneAndDelete({ _id: jobId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Job removed!" });
});
exports.deleteJob = deleteJob;
const showStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let stats = yield Job_1.default.aggregate([
        {
            $match: { createdBy: new mongoose_1.default.Types.ObjectId(req.body.user.userId) },
        },
        {
            $group: { _id: "$status", count: { $sum: 1 } },
        },
    ]);
    // how to reduce in javascript
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };
    // ok lets try to understand
    let monthlyApplications = yield Job_1.default.aggregate([
        // this part is basically get me all that matches this id
        {
            $match: { createdBy: new mongoose_1.default.Types.ObjectId(req.body.user.userId) },
        },
        // this part is like group those with the same year then the same month
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        // this part is like sort what i made earlier by the year in _id then by month in _id
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
        .map((item) => {
        const { _id: { year, month }, count, } = item;
        const date = (0, moment_1.default)()
            .month(month - 1)
            .year(year)
            .format("MMM Y");
        return { date, count };
    })
        .reverse();
    res.status(http_status_codes_1.StatusCodes.OK).json({ defaultStats, monthlyApplications });
});
exports.showStats = showStats;
