import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Job from "../models/Job";

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
  const { position, company, location, id } = req.body;
  const userId = req.body.user.userId;
  console.log(req.body);
  console.log(userId, id);

  if (!position || !company || !location) {
    return new BadRequestError("Please provide all values!");
  }
  console.log("coooo");

  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req: Request, res: Response) => {
  res.send("delete jobs");
};

export const showStats = async (req: Request, res: Response) => {
  res.send("show stats");
};
