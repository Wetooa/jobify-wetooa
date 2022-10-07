import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFound, UnauthenticatedError } from "../errors";
import Job from "../models/Job";
import { checkPermissions } from "../utils/checkPermissions";
import mongoose, { Query, RegexOptions } from "mongoose";
import moment from "moment";

export const createJob = async (req: Request, res: Response) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Provide all values!");
  }

  req.body.createdBy = req.body.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req: Request, res: Response) => {
  interface ReqQueryProps {
    search?: string;
    status?: "all" | "interview" | "declined" | "pending";
    jobType?: "all" | "fulltime" | "partime" | "remote" | "internship";
    sort?: "latest" | "oldest" | "company" | "position";
  }
  interface QuerySearchProps {
    $regex: ReqQueryProps["search"];
    $options: any;
  }
  interface QueryObjectProps {
    search?:
      | [
          { company: QuerySearchProps },
          { position: QuerySearchProps },
          { jobLocation: QuerySearchProps }
        ]
      | [];
    jobType?: "fulltime" | "partime" | "remote" | "internship";
    status?: "interview" | "declined" | "pending";
    createdBy: string;
  }

  const { search, status, jobType, sort }: ReqQueryProps = req.query;

  const queryObject: QueryObjectProps = {
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

  const { search: searchObject, ...query } = queryObject;
  let result: any = Job.find({
    $and: [{ $or: searchObject }, query],
  });

  if (sort === "latest") {
    result = result.sort("-createdAt");
  } else if (sort === "oldest") {
    result = result.sort("createdAt");
  } else if (sort?.startsWith("a-z")) {
    result = result.sort(sort?.substring(4));
  } else {
    result = result.sort(`-${sort?.substring(4)}`);
  }

  const jobs = await result;

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

export const updateJob = async (req: Request, res: Response) => {
  const { user, ...editedJob } = req.body;
  const { id: jobId } = req.params;
  const { position, company } = editedJob;

  if (!position || !company) {
    return new BadRequestError("Please provide all values!");
  }

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFound(`No job with id: ${jobId}`);
  }

  // check permissions part
  checkPermissions(user.userId, job.createdBy);

  // alternative method is to use job.save() to use hooks like UserSchema.pre("save") and more
  // moreover, adding createdBy parameter also works, but you wont be able to have admins that can edit anyones job :)
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, editedJob, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req: Request, res: Response) => {
  const { user } = req.body;
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFound(`No job with id: ${jobId}`);
  }

  checkPermissions(user.userId, job.createdBy);

  await Job.findOneAndDelete({ _id: jobId });
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed!" });
};

export const showStats = async (req: Request, res: Response) => {
  interface StatsProps {
    pending: number;
    interview: number;
    declined: number;
  }
  interface AccumulatorProps {
    title: number;
  }
  interface CurrentProps {
    _id: string;
    count: number;
  }

  let stats: any | StatsProps = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(req.body.user.userId) },
    },
    {
      $group: { _id: "$status", count: { $sum: 1 } },
    },
  ]);

  // how to reduce in javascript
  stats = stats.reduce((acc: any, curr: CurrentProps): AccumulatorProps => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats: StatsProps = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // ok lets try to understand
  let monthlyApplications = await Job.aggregate([
    // this part is basically get me all that matches this id
    {
      $match: { createdBy: new mongoose.Types.ObjectId(req.body.user.userId) },
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
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
