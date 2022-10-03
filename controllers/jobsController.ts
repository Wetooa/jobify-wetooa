import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFound, UnauthenticatedError } from "../errors";
import Job from "../models/Job";
import { checkPermissions } from "../utils/checkPermissions";
import mongoose from "mongoose";

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
  const jobs = await Job.find({ createdBy: req.body.user.userId });
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

  let monthlyApplication: any = [];

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};
